import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Twitter, PhoneCall, ExternalLink } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";

const QUICK: { to: string; key: TranslationKey }[] = [
  { to: "/crop-grading", key: "nav.grading" },
  { to: "/mandi", key: "nav.mandi" },
  { to: "/price-prediction", key: "nav.price" },
  { to: "/weather", key: "nav.weather" },
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

const GOV_LINKS = [
  { label: "eNAM National Market", href: "https://www.enam.gov.in/" },
  { label: "Ministry of Agriculture", href: "https://agricoop.gov.in/" },
  { label: "PM-KISAN", href: "https://pmkisan.gov.in/" },
  { label: "Soil Health Card", href: "https://soilhealth.dac.gov.in/" },
  { label: "Agmarknet Prices", href: "https://agmarknet.gov.in/" },
];

const SOCIALS = [
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: Youtube },
  { label: "X", Icon: Twitter },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-sand/60 dark:bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.about")}</p>
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("footer.social")}
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-2xl bg-card text-foreground shadow-soft transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">{t("footer.quick")}</h3>
          <ul className="space-y-2.5">
            {QUICK.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">{t("footer.gov")}</h3>
          <ul className="space-y-2.5">
            {GOV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-card p-5 shadow-soft">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <PhoneCall className="h-4 w-4 text-primary" aria-hidden />
              {t("footer.emergency")}
            </h3>
            <a
              href="tel:18001801551"
              className="mt-3 block font-display text-2xl font-extrabold text-primary"
            >
              1800-180-1551
            </a>
            <p className="mt-1 text-xs text-muted-foreground">
              Kisan Call Centre · 6 AM – 10 PM · all languages
            </p>
          </div>
          <LanguageSelector full />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EcoAgri Intelligence. {t("footer.rights")}</p>
          <p>Made for farmers, in every Indian language.</p>
        </div>
      </div>
    </footer>
  );
}
