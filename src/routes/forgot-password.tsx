import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, ArrowLeft, Loader2, Leaf, Sprout, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { validatePhone } from "@/lib/auth-validation";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot Password — EcoAgri Intelligence" },
      { name: "description", content: "Reset the password for your EcoAgri farmer account." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }
    setError(null);
    setLoading(true);
    // Password-reset delivery isn't wired to a backend yet — this only
    // confirms the request was captured on the frontend for now.
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <img
        src={heroImg}
        alt="Sunrise over green terraced farmland"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.2_0.05_150/0.92)] via-[oklch(0.28_0.06_150/0.85)] to-[oklch(0.4_0.09_150/0.65)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Sprout className="absolute left-[8%] top-[16%] h-16 w-16 text-sprout/30 animate-sway" />
        <Leaf
          className="absolute right-[10%] top-[12%] h-20 w-20 text-sprout/25 animate-float"
          style={{ animationDelay: "0.8s" }}
        />
      </div>

      <div className="glass w-full max-w-md rounded-[2rem] p-8 shadow-glow sm:p-10">
        <div className="flex justify-center">
          <Logo />
        </div>

        {sent ? (
          <div className="mt-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MailCheck className="h-7 w-7" aria-hidden />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-foreground">Check your phone</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for {phone}, reset instructions are on the way.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8 w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <>
            <h1 className="mt-8 text-center text-3xl font-extrabold text-foreground">
              Forgot password?
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Enter your phone number and we'll send reset instructions.
            </p>

            <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number
                </Label>
                <div className="relative mt-2">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={14}
                    placeholder="+91 98450 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={!!error}
                    className="h-14 rounded-2xl pl-12 text-base"
                  />
                </div>
                {error && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight aria-hidden />}
                {loading ? "Sending..." : "Send reset instructions"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
