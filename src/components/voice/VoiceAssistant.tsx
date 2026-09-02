import { useEffect, useState } from "react";

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
    startRecording,
    stopRecording,
  } = useVoiceRecorder();

  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

      <VoicePlayer audioUrl={response?.audio_url} />
    </div>
  );
}