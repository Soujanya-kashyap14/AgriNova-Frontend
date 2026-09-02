import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, MessageCircle, LifeBuoy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support — EcoAgri Intelligence" },
      {
        name: "description",
        content:
          "Reach the EcoAgri support team by phone, email or the contact form. Read answers to common farmer questions.",
      },
      { property: "og:title", content: "Contact & Support — EcoAgri Intelligence" },
      { property: "og:description", content: "We answer in your language, seven days a week." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

const FAQS = [
  {
    q: "Is EcoAgri Intelligence free to use?",
    a: "Crop grading, mandi discovery, weather and price forecasts are free for individual farmers. FPOs and traders can subscribe to bulk analytics.",
  },
  {
    q: "How accurate is AI crop grading?",
    a: "Our vision model scores 96.4% agreement with trained APMC graders across tomato, onion, chilli and ragi. Accuracy improves with a clear, well-lit photo.",
  },
  {
    q: "Do I need internet in the field?",
    a: "You can capture photos offline. The analysis runs as soon as your phone reconnects, and results are stored on your dashboard.",
  },
  {
    q: "Which languages are supported?",
    a: "English, Kannada, Hindi, Tamil, Telugu and Malayalam. Switch anytime from the language selector in the navigation bar.",
  },
  {
    q: "Where do mandi prices come from?",
    a: "Prices are synced hourly from APMC boards and the eNAM feed, then cross-checked against verified trader submissions.",
  },
];

function ContactPage() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success(t("contact.sent"));
  };

  const channels = [
    { Icon: Phone, label: "Call us", value: "1800-180-1551", href: "tel:18001801551" },
    { Icon: Mail, label: "Email", value: "support@ecoagri.in", href: "mailto:support@ecoagri.in" },
    { Icon: MessageCircle, label: "WhatsApp", value: "+91 98450 12345", href: "https://wa.me/919845012345" },
  ];

  return (
    <>
      <PageHeader eyebrow="Support" title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submit} noValidate className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-9">
            <h2 className="text-xl font-bold">Send us a message</h2>
            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold">
                  {t("contact.name")}
                </Label>
                <Input id="name" name="name" maxLength={100} className="mt-2 h-13 rounded-2xl text-base" aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-semibold">
                  {t("contact.email")}
                </Label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-2 h-13 rounded-2xl text-base" aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-semibold">
                  {t("contact.message")}
                </Label>
                <Textarea id="message" name="message" rows={5} maxLength={1000} className="mt-2 rounded-2xl text-base" aria-invalid={!!errors.message} />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto">
                <Send aria-hidden />
                {t("contact.send")}
              </Button>
            </div>
          </form>

          <div className="space-y-5">
            <ul className="space-y-4">
              {channels.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="card-lift flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </span>
                      <span className="block truncate font-display text-lg font-extrabold">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl gradient-soft p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <MapPin className="h-5 w-5 text-primary" aria-hidden />
                Office
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                4th Floor, Agri Innovation Hub, Yeshwanthpur Industrial Area, Bengaluru 560022
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-bold">
                <LifeBuoy className="h-5 w-5 text-primary" aria-hidden />
                {t("contact.support")} hours
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every day, 6:00 AM – 10:00 PM IST. Emergency agriculture help is available 24×7 on
                the Kisan Call Centre line.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-extrabold md:text-3xl">{t("contact.faq")}</h2>
          <Accordion type="single" collapsible className="mt-6 rounded-[2rem] border border-border bg-card px-6 shadow-soft">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
