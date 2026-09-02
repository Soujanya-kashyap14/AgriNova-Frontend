import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Phone, Lock, ArrowRight, ShieldCheck, Loader2, Leaf, Sprout } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n/I18nProvider";
import { Logo } from "@/components/Logo";
import { api } from "@/lib/api";
import { validatePassword, validatePhone } from "@/lib/auth-validation";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — EcoAgri Intelligence" },
      {
        name: "description",
        content: "Sign in with your phone number to access your farmer dashboard.",
      },
      { property: "og:title", content: "Login — EcoAgri Intelligence" },
      { property: "og:description", content: "Access your EcoAgri farmer account." },
    ],
  }),
  component: LoginPage,
});

type FieldErrors = Record<string, string>;

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [rememberMe, setRememberMe] = useState(true);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = (formData.get("phone") as string) || "";
    const password = (formData.get("password") as string) || "";

    const nextErrors: FieldErrors = {};
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    if (phoneError) nextErrors.phone = phoneError;
    if (passwordError) nextErrors.password = passwordError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await api.login({ phone, password });
      // "Remember me" controls persistence: checked -> localStorage (survives
      // browser restarts), unchecked -> sessionStorage (cleared on tab close).
      api.setToken(response.access_token, rememberMe ? "local" : "session");
      toast.success("Login successful!");
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
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
        <Leaf
          className="absolute left-[14%] bottom-[12%] h-14 w-14 text-sprout/20 animate-float"
          style={{ animationDelay: "1.6s" }}
        />
        <Sprout
          className="absolute right-[16%] bottom-[16%] h-12 w-12 text-sprout/25 animate-sway"
          style={{ animationDelay: "1.1s" }}
        />
      </div>

      <div className="glass w-full max-w-md rounded-[2rem] p-8 shadow-glow sm:p-10">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h1 className="mt-8 text-center text-3xl font-extrabold text-foreground">
          {t("auth.welcome")}
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in with your phone number to continue.
        </p>

        <form className="mt-8 space-y-5" onSubmit={submit} noValidate>
          <Field id="phone" label={t("auth.phone")} Icon={Phone} error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={14}
              placeholder="+91 98450 00000"
              aria-invalid={!!errors.phone}
              className="h-14 rounded-2xl pl-12 text-base"
            />
          </Field>

          <Field id="password" label={t("auth.password")} Icon={Lock} error={errors.password}>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              showLabel={t("auth.showPassword")}
              hideLabel={t("auth.hidePassword")}
              className="h-14 rounded-2xl pl-12 text-base"
            />
          </Field>

          <div className="flex items-center justify-between">
            <label htmlFor="remember-me" className="flex cursor-pointer items-center gap-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <span className="text-sm font-medium text-foreground">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight aria-hidden />}
            {loading ? "Processing..." : t("auth.login")}
          </Button>

          <Button asChild variant="outline" size="xl" className="w-full">
            <Link to="/register">{t("auth.register")}</Link>
          </Button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Your data stays private to your account.
        </p>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to our terms and privacy policy.{" "}
          <Link to="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
            Need help?
          </Link>
        </p>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
