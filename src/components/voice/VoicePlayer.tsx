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
        src={"http://localhost:8000" + audioUrl}
        style={{ width: "100%" }}
      />
    </div>
  );
}