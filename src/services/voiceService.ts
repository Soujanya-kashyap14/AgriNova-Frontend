import axios from "axios";
import { VoiceResponse } from "../types/voice";

const API = "http://localhost:8000/api/voice/chat";

export async function sendVoice(
  audio: Blob
): Promise<VoiceResponse> {

  const formData = new FormData();

  formData.append(
    "file",
    audio,
    "recording.webm"
  );

  const response = await axios.post<VoiceResponse>(
    API,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}