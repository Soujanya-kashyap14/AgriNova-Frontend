import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/I18nProvider";
import { LANGUAGES } from "@/i18n/translations";

export function LanguageSelector({ full = false }: { full?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={full ? "default" : "default"}
          className={full ? "w-full justify-start" : ""}
          aria-label={t("nav.language")}
        >
          <Globe aria-hidden />
          <span className="font-semibold">{current.native}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          {t("nav.language")}
        </DropdownMenuLabel>
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className="cursor-pointer rounded-xl py-2.5 text-base"
          >
            <span className="flex-1">
              {l.native}
              <span className="ml-2 text-xs text-muted-foreground">{l.label}</span>
            </span>
            {l.code === lang && <Check className="h-4 w-4 text-primary" aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
