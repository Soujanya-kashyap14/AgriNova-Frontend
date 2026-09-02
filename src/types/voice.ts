export interface VoiceResponse {
  success: boolean;
  recognized_text: string;
  language: string;
  assistant_reply: string;
  audio_url: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export interface RecordingState {
  isRecording: boolean;
  isProcessing: boolean;
}