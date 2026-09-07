import { useEffect, useState, type FormEvent } from "react";
import { Mic, MessageCircle, Send, Square, X } from "lucide-react";

import { useI18n } from "@/i18n/I18nProvider";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";

const labels = {
  en: { title: "AgriNova Assistant", start: "Ask by voice", listening: "Listening...", processing: "Thinking...", close: "Close", typePlaceholder: "Type your question..." },
  kn: { title: "ಅಗ್ರಿನೋವಾ ಸಹಾಯಕ", start: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ", listening: "ಕೇಳುತ್ತಿದೆ...", processing: "ಯೋಚಿಸುತ್ತಿದೆ...", close: "ಮುಚ್ಚಿ", typePlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ..." },
  hi: { title: "एग्रीनोवा सहायक", start: "आवाज़ से पूछें", listening: "सुन रहा है...", processing: "सोच रहा है...", close: "बंद करें", typePlaceholder: "अपना प्रश्न लिखें..." },
  te: { title: "అగ్రినోవా సహాయకుడు", start: "వాయిస్ తో అడగండి", listening: "వింటోంది...", processing: "ఆలోచిస్తోంది...", close: "మూసివేయి", typePlaceholder: "మీ ప్రశ్నను టైప్ చేయండి..." },
  ta: { title: "அக்ரிநோவா உதவியாளர்", start: "குரலில் கேளுங்கள்", listening: "கேட்கிறது...", processing: "சிந்திக்கிறது...", close: "மூடு", typePlaceholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்..." },
  ml: { title: "അഗ്രിനോവ സഹായി", start: "ശബ്ദത്തിൽ ചോദിക്കൂ", listening: "കേൾക്കുന്നു...", processing: "ചിന്തിക്കുന്നു...", close: "അടയ്ക്കുക", typePlaceholder: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക..." },
} as const;

export default function FloatingVoiceAssistant() {
  const { lang } = useI18n();
  const copy = labels[lang] ?? labels.en;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; sender: "user" | "assistant"; text: string }>>([]);
  const [textInput, setTextInput] = useState("");
  const { isRecording, isProcessing, response, lastRecordingUrl, startRecording, stopRecording, sendText } = useVoiceRecorder(messages);

  useEffect(() => {
    if (!response) return;
    setMessages((previous) => [
      ...previous,
      ...(response.recognized_text
        ? [{ id: crypto.randomUUID(), sender: "user" as const, text: response.recognized_text }]
        : []),
      { id: crypto.randomUUID(), sender: "assistant", text: response.assistant_reply },
    ]);
  }, [response, copy.listening]);

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
      return;
    }
    await startRecording();
  };

  const handleTextSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!textInput.trim() || isProcessing) return;
    sendText(textInput);
    setTextInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {open && (
        <section className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2 font-bold">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {copy.title}
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={copy.close} className="rounded-full p-1 hover:bg-white/15">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </header>
          <div className="max-h-64 space-y-2 overflow-y-auto p-3">
            {messages.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">{copy.start}</p>}
            {messages.map((message) => (
              <p key={message.id} className={`rounded-2xl px-3 py-2 text-sm ${message.sender === "user" ? "ml-6 bg-primary/10" : "mr-6 bg-muted"}`}>
                {message.text}
              </p>
            ))}
          </div>
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
              placeholder={copy.typePlaceholder}
              disabled={isProcessing}
              className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-50"
            />
            <button type="submit" disabled={isProcessing || !textInput.trim()} aria-label="Send" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-40">
              <Send className="h-4 w-4" aria-hidden />
            </button>
          </form>
          <div className="flex items-center justify-between border-t border-border p-3">
            <span className="text-xs text-muted-foreground">
              {isRecording ? copy.listening : isProcessing ? copy.processing : copy.start}
            </span>
            <button type="button" onClick={toggleRecording} disabled={isProcessing} aria-label={isRecording ? "Stop recording" : copy.start} className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 disabled:opacity-50">
              {isRecording ? <Square className="h-4 w-4" fill="currentColor" aria-hidden /> : <Mic className="h-5 w-5" aria-hidden />}
            </button>
          </div>
          {lastRecordingUrl && (
            <div className="flex items-center gap-2 border-t border-border px-3 py-2">
              <span className="text-xs text-muted-foreground">Hear what was recorded:</span>
              <audio controls src={lastRecordingUrl} className="h-8 flex-1" />
            </div>
          )}
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={copy.title} className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/15 transition-transform hover:scale-105">
        {open ? <X aria-hidden /> : <Send className="-rotate-45" aria-hidden />}
      </button>
    </div>
  );
}