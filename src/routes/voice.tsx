import { createFileRoute } from "@tanstack/react-router";
import VoiceAssistant from "@/components/voice/VoiceAssistant";

export const Route = createFileRoute("/voice")({
  component: VoiceAssistant,
});