import { Mic, Square } from "lucide-react";

interface Props {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function VoiceRecorder({
  isRecording,
  onStart,
  onStop,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "25px",
      }}
    >
      <button
        onClick={isRecording ? onStop : onStart}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: isRecording ? "#ef4444" : "#16a34a",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,.2)",
        }}
      >
        {isRecording ? <Square size={30} /> : <Mic size={30} />}
      </button>
    </div>
  );
}