const SERVER_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"
).replace(/\/api\/?$/, "");

interface Props {
  audioUrl?: string;
}

export default function VoicePlayer({ audioUrl }: Props) {
  if (!audioUrl) return null;

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <audio
        controls
        src={SERVER_ORIGIN + audioUrl}
        style={{ width: "100%" }}
      />
    </div>
  );
}