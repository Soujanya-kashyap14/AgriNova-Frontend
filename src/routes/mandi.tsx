import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Navigation,
  Star,
  Clock,
  TrendingUp,
  TrendingDown,
  Locate,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { api, MandiItem, MandiListResponse } from "@/lib/api";
import { FormEvent, useEffect, useMemo, useState } from "react";
import mandiImg from "@/assets/mandi.jpg";

export const Route = createFileRoute("/mandi")({
  head: () => ({
    meta: [
      {
        title: "Nearby Tomato Mandis — AgriWise Intelligence",
      },
      {
        name: "description",
        content:
          "Find nearby tomato mandis from your GPS or a place name, sorted by distance or rating.",
      },
    ],
  }),
  component: MandiPage,
});

function sortMandis(mandis: MandiItem[], sortBy: "distance" | "rating") {
  return [...mandis].sort((a, b) => {
    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating) || Number(a.distance) - Number(b.distance);
    }
    return Number(a.distance) - Number(b.distance) || Number(b.rating) - Number(a.rating);
  });
}

function MandiPage() {
  const { t } = useI18n();
  const [mandiData, setMandiData] = useState<MandiListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationReady, setLocationReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    label?: string;
  } | null>(null);
  const [locationName, setLocationName] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");

  const visibleMandis = useMemo(
    () => sortMandis(mandiData?.mandis || [], sortBy),
    [mandiData, sortBy],
  );

  const loadMandis = async (options?: {
    useGps?: boolean;
    place?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const place = options?.place?.trim();
      let latitude: number | undefined;
      let longitude: number | undefined;

      if (!place && options?.useGps !== false) {
        const gps = await api.getBrowserLocation();
        latitude = gps.latitude;
        longitude = gps.longitude;
        setUserLocation({
          latitude,
          longitude,
          label: "Your GPS location",
        });
      }

      const data = await api.getNearbyMandis(
        latitude,
        longitude,
        undefined,
        undefined,
        place,
        sortBy,
      );

      const sorted = sortMandis(data.mandis || [], sortBy);
      setMandiData({
        ...data,
        mandis: sorted,
        mandi_count: sorted.length,
        sorted_by: sortBy,
      });
      setLocationReady(true);

      if (data.searched_latitude != null && data.searched_longitude != null) {
        setUserLocation({
          latitude: data.searched_latitude,
          longitude: data.searched_longitude,
          label: data.location_label || place || "Selected location",
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to find nearby mandis.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMandis({ useGps: true });
    // Initial GPS search only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchByName = (event: FormEvent) => {
    event.preventDefault();
    if (!locationName.trim()) {
      setError("Enter a city or district name, or use your location.");
      return;
    }
    loadMandis({ useGps: false, place: locationName });
  };

  const openDirections = (
    mandiName: string,
    latitude?: number | null,
    longitude?: number | null,
  ) => {
    let url: string;
    if (
      typeof latitude === "number" &&
      typeof longitude === "number" &&
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${mandiName}, India`,
      )}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title={t("mandi.title")}
        subtitle={t("mandi.subtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-soft">
          <img
            src={mandiImg}
            alt="Aerial view of an Indian wholesale agricultural market"
            width={1200}
            height={800}
            loading="lazy"
            className="h-64 w-full object-cover md:h-80"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[oklch(0.2_0.04_150/0.9)] to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-primary-foreground">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                Nearby tomato markets
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold">
                {loading
                  ? "Finding nearby mandis..."
                  : `${mandiData?.mandi_count ?? 0} mandis found`}
              </p>
              <p className="text-sm opacity-85">
                {locationReady && userLocation
                  ? `From ${userLocation.label || "your location"} · sort by ${sortBy}`
                  : "Use your location or enter a place name"}
              </p>
            </div>

            <Button
              variant="glass"
              size="lg"
              onClick={() => loadMandis({ useGps: true })}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="animate-spin" aria-hidden />
              ) : (
                <Locate aria-hidden />
              )}
              {loading ? "Locating..." : "Use my location"}
            </Button>
          </div>

          {[
            { top: "24%", left: "18%" },
            { top: "44%", left: "62%" },
            { top: "62%", left: "36%" },
            { top: "32%", left: "80%" },
          ].map((position, index) => (
            <span
              key={index}
              aria-hidden
              style={position}
              className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-float"
            >
              <MapPin className="h-4 w-4" />
            </span>
          ))}
        </div>

        <form
          onSubmit={searchByName}
          className="mt-8 flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft md:flex-row md:items-center md:justify-between"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Set a location</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Search tomato mandis near a city or district, then sort by distance or rating.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input
                value={locationName}
                onChange={(event) => setLocationName(event.target.value)}
                placeholder="e.g. Mysore, Kolar, Bangalore Rural"
                className="h-11 rounded-full bg-background px-4"
                aria-label="Location name"
              />
              <Button type="submit" variant="hero" disabled={loading}>
                <MapPin aria-hidden />
                Find mandis
              </Button>
            </div>
          </div>

          <div className="flex shrink-0 rounded-full bg-muted p-1">
            <button
              type="button"
              onClick={() => setSortBy("distance")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                sortBy === "distance"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground"
              }`}
            >
              Distance
            </button>
            <button
              type="button"
              onClick={() => setSortBy("rating")}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                sortBy === "rating"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground"
              }`}
            >
              Rating
            </button>
          </div>
        </form>

        {locationReady && userLocation && !loading && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div>
              <p className="text-sm font-bold">Tomato mandis near you</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {userLocation.label}. Showing distance, travel time and market rating
                {sortBy === "rating"
                  ? ", highest rated first."
                  : ", nearest first."}
              </p>
            </div>
            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              {visibleMandis.length} markets
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 flex items-start gap-3 rounded-3xl border border-destructive/30 bg-destructive/10 p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-bold text-destructive">Unable to find nearby mandis</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => loadMandis({ useGps: true })}
              >
                <RefreshCw aria-hidden />
                Try again
              </Button>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="mt-2 h-4 w-1/3 rounded bg-muted" />
                <div className="mt-6 h-24 rounded-2xl bg-muted" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-2xl bg-muted" />
                  <div className="h-16 rounded-2xl bg-muted" />
                </div>
                <div className="mt-6 h-11 rounded-xl bg-muted" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && mandiData && visibleMandis.length === 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <MapPin className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">No nearby mandis found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another city name or use your current location.
            </p>
            <Button
              variant="hero"
              className="mt-5"
              onClick={() => loadMandis({ useGps: true })}
            >
              <RefreshCw aria-hidden />
              Search again
            </Button>
          </div>
        )}

        {!loading && visibleMandis.length > 0 && (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleMandis.map((mandi, index) => {
              const up = mandi.trend >= 0;
              const Trend = up ? TrendingUp : TrendingDown;

              return (
                <li
                  key={`${mandi.name}-${mandi.city}-${index}`}
                  className="card-lift flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-lg font-bold">{mandi.name}</h2>
                      <p className="truncate text-sm text-muted-foreground">
                        {mandi.city}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-sun/20 px-3 py-1 text-xs font-bold text-sun-foreground">
                      <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                      {Number(mandi.rating).toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-primary/8 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Tomato market price
                    </p>
                    <p className="mt-1 flex flex-wrap items-baseline gap-2">
                      {mandi.price > 0 ? (
                        <>
                          <span className="font-display text-2xl font-extrabold text-primary">
                            ₹{Number(mandi.price).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-muted-foreground">/ quintal</span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground">
                          Price unavailable
                        </span>
                      )}
                      {mandi.trend !== 0 && (
                        <span
                          className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                            up
                              ? "bg-primary/15 text-primary"
                              : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          <Trend className="h-3.5 w-3.5" aria-hidden />
                          {up ? "+" : ""}
                          {mandi.trend}%
                        </span>
                      )}
                    </p>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-muted px-3 py-2.5">
                      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Navigation className="h-3.5 w-3.5" aria-hidden />
                        {t("mandi.distance")}
                      </dt>
                      <dd className="mt-0.5 font-bold">
                        {Number(mandi.distance).toFixed(1)} km
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-muted px-3 py-2.5">
                      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Star className="h-3.5 w-3.5" aria-hidden />
                        {t("mandi.rating")}
                      </dt>
                      <dd className="mt-0.5 font-bold">
                        {Number(mandi.rating).toFixed(1)} / 5
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-muted px-3 py-2.5">
                      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {t("mandi.travel")}
                      </dt>
                      <dd className="mt-0.5 font-bold">{mandi.travel || "—"}</dd>
                    </div>
                    <div className="rounded-2xl bg-muted px-3 py-2.5">
                      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        Area
                      </dt>
                      <dd className="mt-0.5 truncate font-bold">{mandi.city}</dd>
                    </div>
                  </dl>

                  {mandi.crops && mandi.crops.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {mandi.crops.map((crop) => (
                        <li
                          key={crop}
                          className="rounded-full bg-sprout/25 px-3 py-1 text-xs font-semibold text-sprout-foreground"
                        >
                          {crop}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button
                    variant="hero"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={() =>
                      openDirections(mandi.name, mandi.latitude, mandi.longitude)
                    }
                  >
                    <Navigation aria-hidden />
                    {t("mandi.directions")}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}

        {!loading && visibleMandis.length > 0 && (
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Market data powered by CEDA Agri Market Data, Centre for Economic
            Data & Analysis, Ashoka University.
          </p>
        )}
      </section>
    </>
  );
}
