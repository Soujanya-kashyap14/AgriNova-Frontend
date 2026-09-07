import { useEffect, useState, type FormEvent } from "react";

import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";

import VoiceRecorder from "./VoiceRecorder";
import VoiceWave from "./VoiceWave";
import VoiceLoader from "./VoiceLoader";
import VoicePlayer from "./VoicePlayer";
import MessageList from "./MessageList";

import { ChatMessage } from "../../types/voice";


export default function VoiceAssistant() {
  const {
    isRecording,
    isProcessing,
    response,
    lastRecordingUrl,
    startRecording,
    stopRecording,
    sendText,
  } = useVoiceRecorder();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (!response) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "user",
        text: response.recognized_text,
      },
      {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: response.assistant_reply,
      },
    ]);
  }, [response]);

  const handleTextSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!textInput.trim() || isProcessing) return;

    sendText(textInput);
    setTextInput("");
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 30,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        🌱 AgriNova Voice Assistant
      </h1>

      {isRecording && <VoiceWave />}

      {isProcessing && <VoiceLoader />}

      <VoiceRecorder
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
      />

      <MessageList messages={messages} />

      <form
        onSubmit={handleTextSubmit}
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
        }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(event) => setTextInput(event.target.value)}
          placeholder="Or type your question here..."
          disabled={isProcessing}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 24,
            border: "1px solid #d1d5db",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isProcessing || !textInput.trim()}
          style={{
            padding: "0 22px",
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            background: "#16a34a",
            color: "#fff",
            fontWeight: 600,
            opacity: isProcessing || !textInput.trim() ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </form>

      <VoicePlayer audioUrl={response?.audio_url} />

      {lastRecordingUrl && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>
            Hear what your microphone captured:
          </p>
          <audio controls src={lastRecordingUrl} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}