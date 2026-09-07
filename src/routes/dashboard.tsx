import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Heart, ImageIcon, Star, TrendingUp, Wallet, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import {
  api,
  DashboardProfile,
  EarningsResponse,
  MandiListResponse,
  PredictionHistoryResponse,
  ScanHistoryResponse,
} from "@/lib/api";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — EcoAgri Intelligence" },
      {
        name: "description",
        content:
          "Track recent crop analyses, uploaded images, prediction history, favourite markets and earnings in one dashboard.",
      },
      { property: "og:title", content: "Farmer Dashboard — EcoAgri Intelligence" },
      {
        property: "og:description",
        content: "All your crop analyses, markets and earnings in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function settled<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === "fulfilled" ? result.value : null;
}

function Dashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [userProfile, setUserProfile] = useState<DashboardProfile | null>(null);
  const [earnings, setEarnings] = useState<EarningsResponse | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryResponse | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryResponse | null>(null);
  const [mandiData, setMandiData] = useState<MandiListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate({ to: "/login", replace: true });
      return;
    }
    setAuthChecked(true);
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;

    const fetchDashboardData = async () => {
      // Each request is independent: a farmer who denies location access
      // should still see their real profile, earnings and scan history -
      // only the nearby-mandis card should stay empty in that case.
      const [profile, earningsData, scans, predictions, mandis] = await Promise.allSettled([
        api.getUserProfile(),
        api.getEarnings(),
        api.getScanHistory(),
        api.getPredictionHistory(),
        api.getNearbyMandis(),
      ]);

      // api.ts's response interceptor clears the stored token as soon as
      // any request comes back 401 (invalid/expired session). If that
      // happened here, there's nothing to render - send the farmer back
      // to log in instead of showing a dead-end "could not load" card.
      if (!api.isAuthenticated()) {
        navigate({ to: "/login", replace: true });
        return;
      }

      setUserProfile(settled(profile));
      setEarnings(settled(earningsData));
      setScanHistory(settled(scans));
      setPredictionHistory(settled(predictions));
      setMandiData(settled(mandis));

      for (const result of [profile, earningsData, scans, predictions, mandis]) {
        if (result.status === "rejected") {
          console.error("Failed to fetch dashboard data:", result.reason);
        }
      }

      setLoading(false);
    };
    fetchDashboardData();
  }, [authChecked, navigate]);

  if (!authChecked) {
    return null;
  }

  return (
    <>
      <PageHeader eyebrow="Your farm" title={t("dash.title")} subtitle={t("dash.subtitle")}>
        <Button asChild size="lg" variant="hero">
          <Link to="/crop-grading">
            <Camera aria-hidden />
            {t("hero.cta1")}
          </Link>
        </Button>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Profile */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              {t("dash.profile")}
            </h2>
            {loading ? (
              <div className="mt-4 animate-pulse space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-3xl bg-muted" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                </div>
                <div className="h-16 rounded-2xl bg-muted" />
                <div className="h-16 rounded-2xl bg-muted" />
              </div>
            ) : userProfile ? (
              <>
                <div className="mt-4 flex min-w-0 items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl gradient-hero font-display text-xl font-extrabold text-primary-foreground">
                    {userProfile.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold">{userProfile.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {userProfile.location} · {userProfile.farm_size}
                    </p>
                  </div>
                </div>
                <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    { l: "Analyses", v: userProfile.stats.analyses },
                    { l: "Grade 1", v: userProfile.stats.grade1_pct },
                    { l: "Markets", v: userProfile.stats.markets },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-muted px-2 py-3">
                      <dt className="text-[11px] text-muted-foreground">{s.l}</dt>
                      <dd className="font-display text-lg font-extrabold">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 rounded-2xl bg-primary/8 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <Wallet className="h-4 w-4 text-primary" aria-hidden />
                    Season earnings
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-primary">
                    ₹{userProfile.season_earnings.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    +{userProfile.season_change_pct}% vs last season
                  </p>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Could not load your profile. Please refresh the page.
              </p>
            )}
          </div>

          {/* Earnings chart */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">Monthly earnings</h2>
            <p className="mb-4 text-sm text-muted-foreground">Realised sale value across mandis</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earnings?.earnings || []} margin={{ left: -8, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    cursor={{ fill: "var(--muted)" }}
                    contentStyle={{
                      borderRadius: "1rem",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                      fontSize: "0.8rem",
                    }}
                  />
                  <Bar dataKey="earnings" fill="var(--chart-1)" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Recent analyses */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">{t("dash.recent")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {scanHistory?.scans.length ? (
                scanHistory.scans.map((a) => (
                  <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{a.crop}</p>
                      <p className="text-xs text-muted-foreground">{a.date}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          a.grade === "Grade 1"
                            ? "bg-primary/15 text-primary"
                            : "bg-sun/25 text-sun-foreground"
                        }`}
                      >
                        {a.grade}
                      </span>
                      <span className="font-display font-extrabold">
                        ₹{a.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-sm text-muted-foreground">
                  No crop analyses yet. Grade a crop to see it here.
                </li>
              )}
            </ul>
          </div>

          {/* Prediction history */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">{t("dash.history")}</h2>
            <ul className="mt-4 space-y-3">
              {predictionHistory?.predictions.length ? (
                predictionHistory.predictions.map((h) => (
                  <li
                    key={h.crop}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-muted px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{h.crop}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{h.predicted_price} predicted · ₹{h.actual_price} actual
                      </p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                        h.accurate ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                      {h.accurate ? "Accurate" : "Missed"}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No price predictions yet.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Uploads - real photos from this farmer's own crop scans */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ImageIcon className="h-5 w-5 text-primary" aria-hidden />
              {t("dash.uploads")}
            </h2>
            {scanHistory?.scans.some((s) => s.image_url) ? (
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {scanHistory.scans
                  .filter((s) => s.image_url)
                  .slice(0, 4)
                  .map((s) => (
                    <li key={s.id} className="zoom-media rounded-2xl">
                      <img
                        src={s.image_url as string}
                        alt={`${s.crop} scan`}
                        loading="lazy"
                        className="h-28 w-full rounded-2xl object-cover"
                      />
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Photos from your crop scans will appear here.
              </p>
            )}
          </div>

          {/* Favourites */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Heart className="h-5 w-5 text-primary" aria-hidden />
              {t("dash.favorites")}
            </h2>
            <ul className="mt-4 space-y-3">
              {mandiData?.mandis.length ? (
                mandiData.mandis.slice(0, 4).map((m) => (
                  <li
                    key={m.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-muted px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.distance} km</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-sun-foreground">
                      <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                      {m.rating}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">
                  Allow location access to see nearby markets.
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
