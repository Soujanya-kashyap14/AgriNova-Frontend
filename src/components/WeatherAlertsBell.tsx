import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/i18n/I18nProvider";
import { api } from "@/lib/api";
import type { WeatherAlert } from "@/lib/api";

// Alerts rarely change minute to minute; re-check occasionally
// while the tab is open instead of only once on load.
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

function alertTone(level: string): string {
  if (level === "High") {
    return "border-destructive/30 bg-destructive/8 text-destructive";
  }

  if (level === "Medium") {
    return "border-sun/40 bg-sun/12 text-sun-foreground";
  }

  return "border-border bg-muted text-foreground";
}

export function WeatherAlertsBell() {
  const { t } = useI18n();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchAlerts = useCallback(async () => {
    try {
      const data = await api.getWeather();
      setAlerts(data.alerts || []);
    } catch {
      // Silent by design: this bell is a passive convenience.
      // Location/permission errors are already surfaced clearly
      // on the Weather page, no need to duplicate them here.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();

    const interval = window.setInterval(fetchAlerts, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [fetchAlerts]);

  const count = alerts.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={
            count > 0 ? `${t("nav.alerts")} (${count})` : t("nav.alerts")
          }
          className="relative"
        >
          <Bell aria-hidden />
          {count > 0 && (
            <span
              aria-hidden
              className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground"
            >
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 rounded-2xl p-3">
        <h3 className="mb-2 px-1 text-sm font-semibold">
          {t("nav.alerts")}
        </h3>

        {loaded && alerts.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            {t("nav.alerts.empty")}
          </p>
        )}

        {alerts.length > 0 && (
          <ul className="max-h-80 space-y-2 overflow-y-auto">
            {alerts.map((alert, index) => (
              <li
                key={`${alert.title}-${index}`}
                className={`rounded-xl border px-3 py-2 text-sm ${alertTone(alert.level)}`}
              >
                <p className="font-medium">{alert.title}</p>
                <p className="mt-0.5 text-xs opacity-90">{alert.body}</p>
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/weather"
          className="mt-3 block rounded-lg px-1 py-1.5 text-center text-xs font-medium text-primary hover:underline"
        >
          {t("nav.alerts.viewWeather")}
        </Link>
      </PopoverContent>
    </Popover>
  );
}
