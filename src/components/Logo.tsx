import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-2.5" aria-label="EcoAgri Intelligence home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-hero shadow-soft transition-transform duration-300 group-hover:rotate-6">
        <Leaf className="h-5 w-5 text-primary-foreground" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-base font-extrabold tracking-tight">
          EcoAgri<span className="text-primary"> Intelligence</span>
        </span>
        {!compact && (
          <span className="block truncate text-[11px] text-muted-foreground">{t("brand.tagline")}</span>
        )}
      </span>
    </Link>
  );
}
