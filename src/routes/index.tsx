import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Camera, Leaf, ShieldCheck, Sprout, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { FEATURES } from "@/data/features";
import { api } from "@/lib/api";
import heroImg from "@/assets/hero-farm.jpg";
import farmerImg from "@/assets/farmer-phone.jpg";
import VoiceAssistant from "@/components/voice/VoiceAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoAgri Intelligence — Smart Farming Powered by AI" },
      {
        name: "description",
        content:
          "Grade your crop with AI, find the nearest mandi, predict prices and check weather — in English, Kannada, Hindi, Tamil, Telugu and Malayalam.",
      },
      { property: "og:title", content: "Smart Farming Powered by Artificial Intelligence" },
      {
        property: "og:description",
        content: "AI crop grading and smart market recommendations for Indian farmers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Terraced green paddy fields at sunrise with a farmer walking between the rows"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.24_0.06_150/0.88)] via-[oklch(0.3_0.07_150/0.7)] to-[oklch(0.4_0.09_150/0.45)]"
        />

        {/* animated crops */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Sprout className="absolute left-[6%] top-[22%] h-16 w-16 text-sprout/40 animate-sway" />
          <Leaf
            className="absolute right-[10%] top-[18%] h-20 w-20 text-sprout/30 animate-float"
            style={{ animationDelay: "0.8s" }}
          />
          <Leaf
            className="absolute left-[18%] bottom-[14%] h-12 w-12 text-sprout/25 animate-float"
            style={{ animationDelay: "1.6s" }}
          />
          <Sprout
            className="absolute right-[22%] bottom-[10%] h-14 w-14 text-sprout/30 animate-sway"
            style={{ animationDelay: "1.1s" }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-36">
          <div className="animate-rise text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sprout className="h-4 w-4" aria-hidden />
              {t("hero.badge")}
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="hero">
                <Link to="/crop-grading">
                  <Camera aria-hidden />
                  {t("hero.cta1")}
                </Link>
              </Button>
              <Button asChild size="xl" variant="glass">
                <a href="#features">
                  {t("hero.cta2")}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
              {[
                { v: "96.4%", l: t("hero.stat1") },
                { v: "1,240+", l: t("hero.stat2") },
                { v: "58,000", l: t("hero.stat3") },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl px-3 py-4 text-center">
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="block font-display text-xl font-extrabold sm:text-2xl">
                      {s.v}
                    </span>
                    <span className="mt-1 block text-[11px] leading-tight opacity-80">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block">
            <div className="glass animate-float rounded-[2rem] p-5 shadow-glow">
              <div className="zoom-media rounded-3xl">
                <img
                  src={farmerImg}
                  alt="Farmer using the EcoAgri app in a tomato field"
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-64 w-full rounded-3xl object-cover"
                />
              </div>
              <div className="mt-5 rounded-2xl bg-card p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-card-foreground">Tomato · Hybrid</span>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Grade 1
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[92%] rounded-full gradient-hero" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Quality 92% · Freshness 95% · ₹2,450/qtl suggested
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              Features
            </span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">{t("features.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("features.subtitle")}</p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ to, Icon, titleKey, descKey, tint }) => (
              <li key={titleKey}>
                <Link
                  to={to}
                  className="card-lift group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${tint} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{t(titleKey)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(descKey)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {t("features.learnMore")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

            {/* Voice Assistant */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              AI Voice Assistant
            </span>

            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              🌱 Talk to AgriNova
            </h2>

            <p className="mt-3 text-muted-foreground">
              Ask questions about crops, fertilizers, irrigation, diseases,
              weather, market prices and more using your voice.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <VoiceAssistant />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 rounded-[2rem] gradient-soft p-8 sm:grid-cols-3 md:p-12">
            {[
              { Icon: ShieldCheck, t: "Verified mandi data", d: "Prices synced with APMC and eNAM feeds every hour." },
              { Icon: Users, t: "Built with farmers", d: "Field-tested with 400 growers across 6 districts." },
              { Icon: Star, t: "4.8 average rating", d: "Farmers report 18% higher realisation on average." },
            ].map(({ Icon, t: title, d }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card text-primary shadow-soft">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-hero px-8 py-16 text-center text-primary-foreground shadow-glow md:px-16">
            <Leaf
              aria-hidden
              className="absolute -left-8 -top-8 h-40 w-40 text-white/10 animate-float"
            />
            <Sprout
              aria-hidden
              className="absolute -bottom-10 right-0 h-48 w-48 text-white/10 animate-sway"
            />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold md:text-4xl">
              Your next harvest deserves a better price
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
              One photo is all it takes. Grade your crop and get a market plan in under 10 seconds.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" variant="glass">
                <Link to="/crop-grading">
                  <Camera aria-hidden />
                  {t("hero.cta1")}
                </Link>
              </Button>
              <Button asChild size="xl" variant="earth">
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
