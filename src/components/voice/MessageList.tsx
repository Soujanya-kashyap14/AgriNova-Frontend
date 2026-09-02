import { ChatMessage } from "../../types/voice";
import ChatBubble from "./ChatBubble";

interface Props {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg}
        />
      ))}
    </div>
  );
}