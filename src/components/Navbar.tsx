import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { LanguageSelector } from "@/components/LanguageSelector";
import { WeatherAlertsBell } from "@/components/WeatherAlertsBell";
import { useI18n } from "@/i18n/I18nProvider";
import { useTheme } from "@/components/theme-provider";
import { api } from "@/lib/api";
import type { TranslationKey } from "@/i18n/translations";

const LINKS: { to: string; key: TranslationKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/crop-grading", key: "nav.grading" },
  { to: "/mandi", key: "nav.mandi" },
  { to: "/price-prediction", key: "nav.price" },
  { to: "/weather", key: "nav.weather" },
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Navbar() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(api.isAuthenticated());
  }, []);

  const handleLogout = () => {
    api.logout();
    setAuthed(false);
    setOpen(false);
    navigate({ to: "/login" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between"
      >
        <Logo />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-primary/10 data-[status=active]:text-primary 2xl:px-3"
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <WeatherAlertsBell />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hidden sm:inline-flex"
          >
            {theme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
          </Button>
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          <Button asChild variant="hero" className="hidden sm:inline-flex">
            {authed ? (
              <button type="button" onClick={handleLogout}>
                <LogOut aria-hidden />
                Logout
              </button>
            ) : (
              <Link to="/login">
                <User aria-hidden />
                {t("nav.login")}
              </Link>
            )}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label={t("nav.menu")}>
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto p-6">
              <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
              <div className="mb-6">
                <Logo compact />
              </div>
              <ul className="space-y-1">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: l.to === "/" }}
                      className="block rounded-2xl px-4 py-3.5 text-lg font-semibold text-foreground transition-colors hover:bg-accent data-[status=active]:bg-primary/10 data-[status=active]:text-primary"
                    >
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-3">
                <LanguageSelector full />
                <Button variant="outline" className="w-full justify-start" onClick={toggle}>
                  {theme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </Button>
                <Button asChild variant="hero" size="lg" className="w-full">
                  {authed ? (
                    <button type="button" onClick={handleLogout}>
                      <LogOut aria-hidden />
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <User aria-hidden />
                      {t("nav.login")}
                    </Link>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
