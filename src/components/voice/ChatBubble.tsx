import { ChatMessage } from "../../types/voice";

interface Props {
  message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "12px 18px",
          borderRadius: "18px",
          background: isUser ? "#16a34a" : "#f1f5f9",
          color: isUser ? "#fff" : "#111827",
          fontSize: "15px",
          lineHeight: 1.5,
        }}
      >
        {message.text}
      </div>
    </div>
  );
}