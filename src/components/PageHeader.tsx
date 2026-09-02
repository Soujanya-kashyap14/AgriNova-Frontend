import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden gradient-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 md:pb-16 md:pt-20">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
