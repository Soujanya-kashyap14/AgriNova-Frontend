import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  User,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Leaf,
  Sprout,
  MapPin,
  Building2,
  Tractor,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/I18nProvider";
import { Logo } from "@/components/Logo";
import { api } from "@/lib/api";
import {
  validateConfirmPassword,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/auth-validation";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — EcoAgri Intelligence" },
      {
        name: "description",
        content:
          "Create your free farmer account to access AI crop grading, mandi prices and weather alerts.",
      },
      { property: "og:title", content: "Register — EcoAgri Intelligence" },
      {
        property: "og:description",
        content: "Create your EcoAgri farmer account.",
      },
    ],
  }),
  component: RegisterPage,
});

type FieldErrors = {
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  village?: string;
  district?: string;
  state?: string;
  landArea?: string;
};

function RegisterPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const password = (formData.get("password") as string) || "";
    const confirmPassword =
      (formData.get("confirmPassword") as string) || "";

    const village = (formData.get("village") as string) || "";
    const district = (formData.get("district") as string) || "";
    const state = (formData.get("state") as string) || "";
    const landArea = (formData.get("landArea") as string) || "";

    const nextErrors: FieldErrors = {};

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(
      password,
      confirmPassword
    );

    if (nameError) nextErrors.name = nameError;
    if (phoneError) nextErrors.phone = phoneError;
    if (passwordError) nextErrors.password = passwordError;
    if (confirmError) nextErrors.confirmPassword = confirmError;

    if (!village.trim())
      nextErrors.village = "Village is required";

    if (!district.trim())
      nextErrors.district = "District is required";

    if (!state.trim())
      nextErrors.state = "State is required";

    if (!landArea || Number(landArea) <= 0)
      nextErrors.landArea = "Enter valid land area";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0)
      return;

    setLoading(true);

    try {
      const response = await api.signup({
        name,
        phone,
        password,
        village,
        district,
        state,
        landArea: Number(landArea),
      });

      api.setToken(response.access_token, "local");

      toast.success("Account created successfully!");

      navigate({
        to: "/dashboard",
      });

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
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
          {t("auth.create")}
        </h1>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Register your farm details to get personalized AI recommendations.
        </p>

        <form className="mt-8 space-y-5" onSubmit={submit} noValidate>

          <Field id="name" label={t("auth.name")} Icon={User} error={errors.name}>
            <Input
              id="name"
              name="name"
              placeholder="Farmer Name"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field id="phone" label={t("auth.phone")} Icon={Phone} error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              placeholder="+91 9876543210"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field id="password" label={t("auth.password")} Icon={Lock} error={errors.password}>
            <PasswordInput
              id="password"
              name="password"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field
            id="confirmPassword"
            label={t("auth.confirmPassword")}
            Icon={Lock}
            error={errors.confirmPassword}
          >
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field
            id="village"
            label="Village"
            Icon={MapPin}
            error={errors.village}
          >
            <Input
              id="village"
              name="village"
              placeholder="Village Name"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field
            id="district"
            label="District"
            Icon={Building2}
            error={errors.district}
          >
            <Input
              id="district"
              name="district"
              placeholder="District"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field
            id="state"
            label="State"
            Icon={MapPin}
            error={errors.state}
          >
            <Input
              id="state"
              name="state"
              defaultValue="Karnataka"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Field
            id="landArea"
            label="Land Area (Acres)"
            Icon={Tractor}
            error={errors.landArea}
          >
            <Input
              id="landArea"
              name="landArea"
              type="number"
              step="0.1"
              placeholder="5.5"
              className="h-14 rounded-2xl pl-12"
            />
          </Field>

          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight />
            )}

            {loading ? "Creating Account..." : "Register"}
          </Button>

        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          Your farm information is stored securely.
        </p>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
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
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        {children}
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}