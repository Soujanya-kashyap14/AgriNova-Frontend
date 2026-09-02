import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target,
  Eye,
  Sprout,
  HeartHandshake,
  Camera,
  BrainCircuit,
  Code2,
  Database,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import farmerImg from "@/assets/farmer-phone.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About AgriNova — Our Mission & Team",
      },
      {
        name: "description",
        content:
          "Learn about AgriNova, an AI-powered agriculture platform designed to support farmers with crop intelligence, disease detection, crop grading, price prediction and nearby mandi information.",
      },
      {
        property: "og:title",
        content: "About AgriNova",
      },
      {
        property: "og:description",
        content:
          "Our mission, vision and the team building AI-powered tools for Indian farmers.",
      },
    ],
  }),
  component: AboutPage,
});

const TEAM = [
  {
    name: "Soujanya Kashyap M S",
    usn: "4SN23CS108",
    role: "Backend & AI Development",
    email: "kashyapsoujanya@gmail.com",
    image: "/team/soujanya.jpg",
    initials: "SK",
    Icon: BrainCircuit,
    bio: "Contributing to backend development, AI integration and intelligent agriculture solutions in AgriNova.",
  },
  {
    name: "Rachana C",
    usn: "4SN23CS077",
    role: "Frontend & UI Developer",
    email: "rachanamowli1706@gmail.com",
    image: "/team/rachana.jpg",
    initials: "RC",
    Icon: Code2,
    bio: "Contributing to the user interface, responsive design and farmer-friendly experience of the AgriNova platform.",
  },
  {
    name: "Pruthvi Y N",
    usn: "4SN23CS079",
    role: "Literature Survey & Dataset Collection",
    email: "pruthviyn72005@gmail.com",
    image: "/team/pruthvi.jpg",
    initials: "PY",
    Icon: Database,
    bio: "Contributing to literature survey, agricultural dataset collection and preparation of data required for AgriNova.",
  },
];

const VALUES = [
  {
    Icon: Sprout,
    t: "Farmer First",
    d: "Every feature is designed to provide practical and useful solutions for farmers.",
  },
  {
    Icon: HeartHandshake,
    t: "Accessible Technology",
    d: "AgriNova aims to make AI-powered agricultural technology simple and accessible.",
  },
  {
    Icon: Target,
    t: "Data Driven",
    d: "We use AI, machine learning and agricultural data to provide meaningful insights.",
  },
];

function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow="About AgriNova"
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">

        {/* Mission and Vision */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="zoom-media rounded-[2rem] shadow-soft">
            <img
              src={farmerImg}
              alt="Farmer checking crop information on a smartphone"
              width={1200}
              height={900}
              loading="lazy"
              className="h-full max-h-[26rem] w-full rounded-[2rem] object-cover"
            />
          </div>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Target className="h-6 w-6 text-primary" aria-hidden />
                {t("about.mission")}
              </h2>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t("about.missionText")}
              </p>
            </article>

            <article className="rounded-[2rem] border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Eye className="h-6 w-6 text-primary" aria-hidden />
                {t("about.vision")}
              </h2>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t("about.visionText")}
              </p>
            </article>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Believe
            </p>

            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Built with Purpose
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              AgriNova combines agriculture and technology to create practical
              solutions for modern farming.
            </p>
          </div>

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ Icon, t: title, d }) => (
              <li
                key={title}
                className="card-lift rounded-3xl gradient-soft p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-card text-primary shadow-soft">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>

                <h3 className="mt-4 text-lg font-bold">{title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {d}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Team */}
        <div className="mt-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Team
            </p>

            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Meet the Team Behind AgriNova
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              A team of Computer Science students working together to develop
              an AI-powered agriculture platform for smarter farming.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-3">
            {TEAM.map((member) => {
              const RoleIcon = member.Icon;

              return (
                <li
                  key={member.name}
                  className="card-lift rounded-3xl border border-border bg-card p-6 text-center shadow-soft"
                >
                  {/* Profile Image */}
                  <div className="relative mx-auto h-28 w-28">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-28 w-28 rounded-3xl object-cover shadow-soft"
                    />

                    <span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl border-4 border-card bg-primary text-primary-foreground">
                      <RoleIcon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-6 text-lg font-bold">
                    {member.name}
                  </h3>

                  {/* USN */}
                  <p className="mt-1 text-xs text-muted-foreground">
                    USN: {member.usn}
                  </p>

                  {/* Role */}
                  <p className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>

                  {/* Email */}
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-5 inline-flex max-w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden />

                    <span className="truncate">
                      {member.email}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* AgriNova Features */}
        <div className="mt-16 rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              AgriNova Features
            </p>

            <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Intelligent Tools for Modern Farming
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              AgriNova brings multiple AI-powered agricultural solutions
              together in one platform.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Crop Recommendation",
              "Crop Disease Detection",
              "Crop Grading A / B / C",
              "Market Price Prediction",
              "Nearby Mandi Information",
              "Weather Insights",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Sprout className="h-4 w-4" aria-hidden />
                </span>

                <span className="text-sm font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-[2rem] gradient-hero px-8 py-14 text-center text-primary-foreground shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-90">
            Experience AgriNova
          </p>

          <h2 className="max-w-xl text-2xl font-extrabold md:text-3xl">
            Try our AI-powered crop grading
          </h2>

          <p className="max-w-2xl text-sm opacity-90 md:text-base">
            Upload a crop image and explore how AgriNova uses artificial
            intelligence to provide useful agricultural insights.
          </p>

          <Button asChild size="xl" variant="glass">
            <Link to="/crop-grading">
              <Camera aria-hidden />
              {t("hero.cta1")}
            </Link>
          </Button>
        </div>

      </section>
    </>
  );
}

