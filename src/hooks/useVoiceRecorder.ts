import { useRef, useState } from "react";
import { sendVoice, sendTextMessage } from "../services/voiceService";
import { VoiceResponse } from "../types/voice";

const SERVER_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"
).replace(/\/api\/?$/, "");

type ConversationMessage = {
  sender: "user" | "assistant";
  text: string;
};

// Same real-location fallback used on the weather page (src/routes/weather.tsx) -
// used only when the browser can't/won't provide a live GPS fix, so a
// "weather at my location" question never silently ends up with no
// location at all (which previously made the assistant fall back to
// asking Gemini to guess a city name from phrases like "current
// location", which isn't a real place and always failed).
const FALLBACK_LOCATION = {
  latitude: 12.9141,
  longitude: 74.856,
};

async function getLocation(): Promise<{
  latitude?: number;
  longitude?: number;
}> {
  if (!navigator.geolocation) return { ...FALLBACK_LOCATION };

  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          // 2.5s was too aggressive - a real GPS fix (or even the
          // permission prompt itself) routinely takes longer than
          // that, silently producing no location at all.
          timeout: 8000,
        });
      },
    );

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch {
    return { ...FALLBACK_LOCATION };
  }
}

// Diagnostic only - never blocks or alters the request. Logs how
// loud the browser actually captured the recording (RMS of the
// decoded PCM), so a quiet/near-silent capture (bad mic, wrong
// input device, room too far away) is visible in the browser
// console and distinguishable from a backend/Whisper-side problem
// on the exact same recording.
async function logAudioLevel(blob: Blob): Promise<void> {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextCtor) return;

    const audioContext = new AudioContextCtor();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const samples = audioBuffer.getChannelData(0);

    let sumSquares = 0;
    let peak = 0;

    for (let i = 0; i < samples.length; i++) {
      sumSquares += samples[i] * samples[i];
      peak = Math.max(peak, Math.abs(samples[i]));
    }

    const rms = Math.sqrt(sumSquares / samples.length);

    console.log(
      `🔊 Captured audio level - RMS: ${rms.toFixed(4)}, peak: ${peak.toFixed(4)}` +
        (rms < 0.01
          ? " (very quiet - check microphone/input device/distance)"
          : ""),
    );

    // A single RMS/peak for the whole clip can look "healthy" even
    // when the recording is mostly silence with one loud spike (a
    // mic bump, click, or pop) - the average gets pulled up by that
    // one spike. Breaking loudness into windows shows the actual
    // shape: sustained speech-level energy across most windows, vs.
    // one or two loud windows surrounded by near-silence.
    const windowSeconds = 0.5;
    const windowSize = Math.max(
      1,
      Math.round(windowSeconds * audioBuffer.sampleRate),
    );
    const windowRms: number[] = [];
    for (let start = 0; start < samples.length; start += windowSize) {
      const end = Math.min(start + windowSize, samples.length);
      let windowSumSquares = 0;
      for (let i = start; i < end; i++) {
        windowSumSquares += samples[i] * samples[i];
      }
      windowRms.push(Math.sqrt(windowSumSquares / (end - start)));
    }

    const loudWindows = windowRms.filter((v) => v > 0.02).length;
    const quietWindows = windowRms.length - loudWindows;

    console.log(
      `🔊 Loudness by ${windowSeconds}s window: ` +
        windowRms.map((v) => v.toFixed(3)).join(", "),
    );
    console.log(
      `🔊 ${loudWindows}/${windowRms.length} windows had speech-level energy (>0.02 RMS), ` +
        `${quietWindows} were quiet/silent` +
        (loudWindows <= 1 && windowRms.length > 2
          ? " (mostly silence with at most one loud moment - likely a bump/click/pop rather than sustained speech)"
          : ""),
    );

    audioContext.close();
  } catch (err) {
    console.warn("⚠️ Could not analyze audio level:", err);
  }
}

function playResponseAudio(audioUrl: string | null | undefined) {
  if (!audioUrl) return;

  const audio = new Audio(`${SERVER_ORIGIN}${audioUrl}`);
  audio.preload = "auto";

  audio.play().catch((audioError) => {
    console.warn("⚠️ Could not autoplay response:", audioError);
  });
}

export function useVoiceRecorder(conversation: ConversationMessage[] = []) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const recordingStartedAt = useRef<number>(0);

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<VoiceResponse | null>(null);
  // Lets the farmer (or us, debugging) play back exactly what the mic
  // captured, in the same browser tab - the most direct way to tell
  // "the mic/room captured mostly noise" apart from "there's a bug
  // somewhere between capture and the recognizer", since console
  // numbers alone can't distinguish those two.
  const [lastRecordingUrl, setLastRecordingUrl] = useState<string | null>(null);
  const lastRecordingUrlRef = useRef<string | null>(null);

  async function startRecording() {
    try {
      console.log("🎙️ Starting microphone...");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          // autoGainControl was the proven cause of an earlier bug:
          // real recordings showed a smooth loudness decay from loud
          // to the noise floor within ~2s regardless of how long the
          // farmer spoke - AGC reacting to the initial loud moment
          // and then clamping everything after. Keep it off.
          autoGainControl: false,
          // noiseSuppression is different: it targets exactly the
          // steady hiss/hum a noisy mic or environment produces,
          // which playback confirmed is what's actually being
          // captured in some setups (constant hiss, no audible
          // voice). It doesn't cause AGC's decay behavior on its
          // own, so there's no reason to leave it off.
          noiseSuppression: true,
          channelCount: 1,
        },
      });

      mediaStream.current = stream;
      chunks.current = [];

      let mimeType = "";

      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeType = "audio/webm";
      } else {
        mimeType = "";
      }

      console.log("🎵 MIME type:", mimeType || "browser default");

      // Chrome's default Opus bitrate for voice can be quite low
      // (often ~32kbps), which is fine for a phone call but throws
      // away detail Whisper could otherwise use. 128kbps costs
      // almost nothing for a few seconds of speech and gives the
      // recognizer a cleaner signal to work with.
      const recorderOptions: MediaRecorderOptions = {
        audioBitsPerSecond: 128000,
        ...(mimeType ? { mimeType } : {}),
      };

      const recorder = new MediaRecorder(stream, recorderOptions);

      mediaRecorder.current = recorder;
      recordingStartedAt.current = Date.now();

      recorder.onstart = () => {
        console.log("🔴 Recording started");
        setIsRecording(true);
      };

      recorder.ondataavailable = (event: BlobEvent) => {
        console.log(
          "📦 Audio chunk:",
          event.data.size,
          "bytes",
          event.data.type
        );

        if (event.data && event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.onerror = (event) => {
        console.error("❌ MediaRecorder error:", event);
      };

      recorder.onstop = async () => {
        try {
          console.log("🛑 Recording stopped");

          const actualMimeType =
            recorder.mimeType || "audio/webm;codecs=opus";

          console.log("🎵 Final MIME:", actualMimeType);
          console.log("📦 Total chunks:", chunks.current.length);

          const totalSize = chunks.current.reduce(
            (total, chunk) => total + chunk.size,
            0
          );

          console.log("📦 Total audio size:", totalSize, "bytes");

          if (chunks.current.length === 0 || totalSize === 0) {
            console.error("❌ No audio data recorded.");
            alert("No audio was recorded. Please try again.");
            return;
          }

          const audioBlob = new Blob(chunks.current, {
            type: actualMimeType,
          });

          console.log(
            "🎧 Final audio Blob:",
            audioBlob.size,
            "bytes",
            audioBlob.type
          );

          if (audioBlob.size < 1000) {
            console.warn(
              "⚠️ Audio file is extremely small:",
              audioBlob.size,
              "bytes"
            );
          }

          // Fire-and-forget: purely diagnostic, never blocks sending.
          logAudioLevel(audioBlob);

          if (lastRecordingUrlRef.current) {
            URL.revokeObjectURL(lastRecordingUrlRef.current);
          }
          const recordingUrl = URL.createObjectURL(audioBlob);
          lastRecordingUrlRef.current = recordingUrl;
          setLastRecordingUrl(recordingUrl);

          setIsProcessing(true);

          console.log("📤 Sending audio to backend...");

          const selectedLanguage =
            window.localStorage.getItem("ecoagri-lang") || "en";

          const { latitude, longitude } = await getLocation();

          const result = await sendVoice(
            audioBlob,
            selectedLanguage,
            latitude,
            longitude,
            conversation,
          );

          console.log("✅ Backend response:", result);

          setResponse(result);

          playResponseAudio(result.audio_url);
        } catch (err) {
          console.error("❌ Voice processing failed:", err);
          alert("Voice assistant failed. Check the backend terminal.");
        } finally {
          setIsProcessing(false);

          if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((track) => {
              track.stop();
            });

            mediaStream.current = null;
          }

          mediaRecorder.current = null;
          chunks.current = [];
        }
      };

      recorder.start(250);

      console.log("🎙️ Recorder started successfully");
    } catch (err) {
      console.error("❌ Microphone error:", err);
      alert(
        "Unable to access microphone. Please allow microphone permission and try again."
      );
    }
  }

  async function stopRecording() {
    const recorder = mediaRecorder.current;

    if (!recorder) {
      console.warn("⚠️ No active recorder.");
      return;
    }

    if (recorder.state !== "recording") {
      console.warn("⚠️ Recorder is not recording:", recorder.state);
      return;
    }

    const recordingDuration = Date.now() - recordingStartedAt.current;

    console.log("⏱️ Recording duration:", recordingDuration, "ms");

    if (recordingDuration < 500) {
      console.warn("⚠️ Recording was too short.");
      alert("Please hold the microphone for a little longer while speaking.");
      return;
    }

    setIsRecording(false);

    try {
      // Force the recorder to send any remaining audio data.
      recorder.requestData();
    } catch (err) {
      console.warn("⚠️ requestData failed:", err);
    }

    // Give the browser time to deliver the final audio chunk.
    await new Promise((resolve) => setTimeout(resolve, 150));

    if (recorder.state === "recording") {
      recorder.stop();
    }
  }

  async function sendText(question: string) {
    const trimmed = question.trim();

    if (!trimmed) return;

    setIsProcessing(true);

    try {
      const selectedLanguage =
        window.localStorage.getItem("ecoagri-lang") || "en";

      const { latitude, longitude } = await getLocation();

      const result = await sendTextMessage(
        trimmed,
        selectedLanguage,
        latitude,
        longitude,
        conversation,
      );

      console.log("✅ Backend response:", result);

      setResponse(result);

      playResponseAudio(result.audio_url);
    } catch (err) {
      console.error("❌ Text chat failed:", err);
      alert("Assistant failed to respond. Check the backend terminal.");
    } finally {
      setIsProcessing(false);
    }
  }

  return {
    isRecording,
    isProcessing,
    response,
    lastRecordingUrl,
    startRecording,
    stopRecording,
    sendText,
  };
}