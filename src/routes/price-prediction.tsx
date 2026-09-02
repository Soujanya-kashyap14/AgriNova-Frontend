import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarCheck, IndianRupee, TrendingUp, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { api, PricePredictionResponse } from "@/lib/api";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/price-prediction")({
  head: () => ({
    meta: [
      { title: "Crop Price Prediction — EcoAgri Intelligence" },
      {
        name: "description",
        content:
          "AI price forecasts for tomorrow, the next 7 days and the next 30 days, plus the best day to sell your crop.",
      },
      { property: "og:title", content: "Crop Price Prediction — EcoAgri Intelligence" },
      {
        property: "og:description",
        content: "Forecast mandi prices before you harvest and sell.",
      },
    ],
  }),
  component: PricePage,
});

const chartTooltip = {
  contentStyle: {
    borderRadius: "1rem",
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--card-foreground)",
    fontSize: "0.8rem",
  },
};

function PricePage() {
  const { t } = useI18n();
  const [priceData, setPriceData] = useState<PricePredictionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const data = await api.getPricePrediction("Tomato");
        setPriceData(data);
      } catch (error) {
        console.error("Failed to fetch price data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPriceData();
  }, []);

  const stats = priceData ? [
    { label: t("price.today"), value: `₹${priceData.summary.today_price.toLocaleString("en-IN")}`, sub: `${priceData.summary.crop} · per quintal`, Icon: IndianRupee, tint: "bg-primary/12 text-primary" },
    { label: t("price.tomorrow"), value: `₹${priceData.summary.tomorrow_price.toLocaleString("en-IN")}`, sub: `${priceData.summary.tomorrow_change_pct > 0 ? "+" : ""}${priceData.summary.tomorrow_change_pct}% expected`, Icon: TrendingUp, tint: "bg-sprout/25 text-sprout-foreground" },
    { label: t("price.best"), value: priceData.summary.best_selling_day, sub: `₹${priceData.summary.best_selling_price.toLocaleString("en-IN")} peak forecast`, Icon: CalendarCheck, tint: "bg-sun/20 text-sun-foreground" },
    { label: "Model confidence", value: `${priceData.summary.model_confidence}%`, sub: "Based on 5-year arrivals", Icon: Sparkles, tint: "bg-sky/15 text-sky" },
  ] : [];

  return (
    <>
      <PageHeader eyebrow="Forecast" title={t("price.title")} subtitle={t("price.subtitle")} />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, sub, Icon, tint }) => (
            <li key={label} className="card-lift rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tint}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">{t("price.week")}</h2>
            <p className="mb-4 text-sm text-muted-foreground">Predicted modal price per quintal</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData?.week_forecast || []} margin={{ left: -18, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} domain={["dataMin-120", "dataMax+120"]} />
                  <Tooltip {...chartTooltip} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="var(--chart-1)"
                    strokeWidth={3}
                    fill="url(#gPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-bold">{t("price.month")}</h2>
            <p className="mb-4 text-sm text-muted-foreground">Rolling 30-day modal price trend</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData?.month_trend || []} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} interval={4} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} domain={["dataMin-120", "dataMax+120"]} />
                  <Tooltip {...chartTooltip} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="var(--chart-4)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold">Daily price range</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Expected low and high across nearby mandis
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData?.week_forecast || []} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip {...chartTooltip} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="low" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="high" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] gradient-hero p-8 text-primary-foreground shadow-glow md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">{t("price.best")}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">{priceData?.best_day.day}, ₹{priceData?.best_day.price.toLocaleString("en-IN")} / quintal</h2>
          <p className="mt-3 max-w-xl text-primary-foreground/85">
            {priceData?.best_day.narrative || "Arrivals dip mid-week while retail demand rises before the weekend."}
          </p>
        </div>
      </section>
    </>
  );
}
