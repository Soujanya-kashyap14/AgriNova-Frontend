import axios from "axios";
import { VoiceResponse } from "../types/voice";

type ConversationMessage = {
  sender: "user" | "assistant";
  text: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const API = `${API_BASE_URL}/voice/chat`;
const TEXT_API = `${API_BASE_URL}/voice/text-chat`;

export async function sendVoice(
  audio: Blob,
  language = "en",
  latitude?: number,
  longitude?: number,
  conversation: ConversationMessage[] = [],
): Promise<VoiceResponse> {

  const formData = new FormData();

  const extension = audio.type.includes("mp4")
    ? "m4a"
    : audio.type.includes("ogg")
      ? "ogg"
      : "webm";

  formData.append(
    "file",
    audio,
    `recording.${extension}`
  );

  formData.append("language", language);
  formData.append(
    "conversation",
    JSON.stringify(conversation.slice(-8)),
  );

  if (latitude !== undefined && longitude !== undefined) {
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));
  }

  const response = await axios.post<VoiceResponse>(
    API,
    formData,
    {
      timeout: 120000,
    }
  );

  return response.data;
}

export async function sendTextMessage(
  question: string,
  language = "en",
  latitude?: number,
  longitude?: number,
  conversation: ConversationMessage[] = [],
): Promise<VoiceResponse> {

  const response = await axios.post<VoiceResponse>(
    TEXT_API,
    {
      question,
      language,
      latitude: latitude !== undefined ? String(latitude) : undefined,
      longitude: longitude !== undefined ? String(longitude) : undefined,
      conversation: conversation.slice(-8),
    },
    {
      timeout: 60000,
    }
  );

  return response.data;
}