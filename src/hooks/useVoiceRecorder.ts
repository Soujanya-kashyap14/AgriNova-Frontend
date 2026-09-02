import { useRef, useState } from "react";
import { sendVoice } from "../services/voiceService";
import { VoiceResponse } from "../types/voice";

export function useVoiceRecorder() {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const recordingStartedAt = useRef<number>(0);

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<VoiceResponse | null>(null);

  async function startRecording() {
    try {
      console.log("🎙️ Starting microphone...");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
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

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

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

          setIsProcessing(true);

          console.log("📤 Sending audio to backend...");

          const result = await sendVoice(audioBlob);

          console.log("✅ Backend response:", result);

          setResponse(result);

          if (result.audio_url) {
            const audio = new Audio(
              `http://localhost:8000${result.audio_url}`
            );

            audio.preload = "auto";

            try {
              await audio.play();
            } catch (audioError) {
              console.warn("⚠️ Could not autoplay response:", audioError);
            }
          }
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

  return {
    isRecording,
    isProcessing,
    response,
    startRecording,
    stopRecording,
  };
}