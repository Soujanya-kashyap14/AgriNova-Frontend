import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Thermometer,
  Droplets,
  CloudRain,
  Wind,
  Sun,
  Cloud,
  AlertTriangle,
  Sunrise,
  Sunset,
  MapPin,
  LocateFixed,
  RefreshCw,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { api, WeatherResponse } from "@/lib/api";

import { useCallback, useEffect, useState } from "react";


// ============================================================
// ROUTE
// ============================================================

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      {
        title: "Farm Weather Dashboard — EcoAgri Intelligence",
      },
      {
        name: "description",
        content:
          "Temperature, humidity, rain probability, wind speed and crop-stage weather alerts for your field.",
      },
      {
        property: "og:title",
        content: "Farm Weather Dashboard — EcoAgri Intelligence",
      },
      {
        property: "og:description",
        content:
          "Field-level weather and alerts for the week ahead.",
      },
    ],
  }),

  component: WeatherPage,
});


// ============================================================
// ICONS
// ============================================================

const ICONS = {
  sun: Sun,
  rain: CloudRain,
  cloud: Cloud,
} as const;


// ============================================================
// DEFAULT FALLBACK LOCATION
// ============================================================
//
// This is ONLY used when the browser refuses/unable to provide
// a location.
//
// It prevents the application from silently using Davangere,
// Hoskote, Bengaluru, etc.
//
// ============================================================

const FALLBACK_LOCATION = {
  latitude: 12.9141,
  longitude: 74.8560,
  name: "Mangalore",
};


// ============================================================
// GEOLOCATION TYPE
// ============================================================

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}


// ============================================================
// WEATHER PAGE
// ============================================================

function WeatherPage() {
  const { t } = useI18n();

  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [locationSource, setLocationSource] =
    useState<"gps" | "fallback">("gps");

  const [coordinates, setCoordinates] =
    useState<Coordinates | null>(null);


  // ==========================================================
  // FETCH WEATHER USING COORDINATES
  // ==========================================================

  const fetchWeather = useCallback(
    async (
      latitude: number,
      longitude: number,
      source: "gps" | "fallback",
    ) => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "================================="
        );

        console.log(
          "[WEATHER] Fetching weather"
        );

        console.log(
          "[WEATHER] Latitude:",
          latitude
        );

        console.log(
          "[WEATHER] Longitude:",
          longitude
        );

        console.log(
          "[WEATHER] Source:",
          source
        );

        console.log(
          "================================="
        );


        const data = await api.getWeather(
          latitude,
          longitude,
          source === "gps"
            ? "Current browser location"
            : FALLBACK_LOCATION.name,
        );


        console.log(
          "[WEATHER] API response:",
          data
        );


        setWeather(data);

        setLocationSource(source);

        setCoordinates({
          latitude,
          longitude,
          accuracy:
            source === "gps"
              ? coordinates?.accuracy ?? 0
              : 0,
        });
      } catch (err) {
        console.error(
          "[WEATHER] Failed to fetch weather:",
          err
        );

        setError(
          "Unable to fetch weather information. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [coordinates?.accuracy]
  );


  // ==========================================================
  // GET CURRENT BROWSER LOCATION
  // ==========================================================

  const getCurrentLocation = useCallback(() => {
    setLocationLoading(true);
    setError(null);

    console.log(
      "[WEATHER] Requesting fresh browser location..."
    );


    // --------------------------------------------------------
    // Browser does not support geolocation
    // --------------------------------------------------------

    if (!navigator.geolocation) {
      console.warn(
        "[WEATHER] Geolocation is not supported."
      );

      setLocationSource("fallback");

      fetchWeather(
        FALLBACK_LOCATION.latitude,
        FALLBACK_LOCATION.longitude,
        "fallback"
      ).finally(() => {
        setLocationLoading(false);
      });

      return;
    }


    // --------------------------------------------------------
    // Request fresh GPS position
    // --------------------------------------------------------

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        const accuracy =
          position.coords.accuracy;


        console.log(
          "================================="
        );

        console.log(
          "[WEATHER] CURRENT BROWSER LOCATION"
        );

        console.log(
          "Latitude:",
          latitude
        );

        console.log(
          "Longitude:",
          longitude
        );

        console.log(
          "Accuracy:",
          accuracy,
          "meters"
        );

        console.log(
          "================================="
        );


        // ----------------------------------------------------
        // Store coordinates
        // ----------------------------------------------------

        setCoordinates({
          latitude,
          longitude,
          accuracy,
        });


        // ----------------------------------------------------
        // Basic coordinate validation
        // ----------------------------------------------------

        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude)
        ) {
          console.error(
            "[WEATHER] Invalid browser coordinates."
          );

          setError(
            "Your device returned an invalid location."
          );

          await fetchWeather(
            FALLBACK_LOCATION.latitude,
            FALLBACK_LOCATION.longitude,
            "fallback"
          );

          setLocationLoading(false);

          return;
        }


        // ----------------------------------------------------
        // VERY LOW ACCURACY WARNING
        //
        // This does NOT automatically reject the location.
        // Desktop browsers may report low accuracy.
        // ----------------------------------------------------

        if (accuracy > 1000) {
          console.warn(
            "[WEATHER] GPS accuracy is low:",
            accuracy,
            "meters"
          );
        }


        // ----------------------------------------------------
        // USE THE ACTUAL COORDINATES
        // ----------------------------------------------------

        await fetchWeather(
          latitude,
          longitude,
          "gps"
        );

        setLocationLoading(false);
      },


      // ======================================================
      // GEOLOCATION ERROR
      // ======================================================

      async (geoError) => {
        console.error(
          "[WEATHER] Geolocation error:",
          geoError
        );


        let message =
          "Unable to determine your location.";


        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            message =
              "Location permission was denied. Using Mangalore as the fallback location.";
            break;

          case geoError.POSITION_UNAVAILABLE:
            message =
              "Your device could not determine its location. Using Mangalore as the fallback location.";
            break;

          case geoError.TIMEOUT:
            message =
              "Location request timed out. Using Mangalore as the fallback location.";
            break;

          default:
            message =
              "Unable to determine your location. Using Mangalore as the fallback location.";
        }


        setError(message);

        setLocationSource("fallback");


        // ----------------------------------------------------
        // FALLBACK TO MANGALORE
        // ----------------------------------------------------

        await fetchWeather(
          FALLBACK_LOCATION.latitude,
          FALLBACK_LOCATION.longitude,
          "fallback"
        );


        setLocationLoading(false);
      },


      // ======================================================
      // GEOLOCATION OPTIONS
      // ======================================================

      {
        enableHighAccuracy: true,

        // Don't use an old cached location.
        maximumAge: 0,

        // Give the browser enough time to get a fresh
        // location.
        timeout: 30000,
      }
    );
  }, [fetchWeather]);


  // ==========================================================
  // INITIAL WEATHER LOAD
  // ==========================================================

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);


  // ==========================================================
  // WEATHER METRICS
  // ==========================================================

  const metrics = weather
    ? [
        {
          label: t("weather.temp"),
          value: `${weather.current.temperature}°C`,
          sub: `Feels like ${weather.current.feels_like}°C`,
          Icon: Thermometer,
          tint:
            "bg-sun/20 text-sun-foreground",
        },

        {
          label: t("weather.humidity"),
          value: `${weather.current.humidity}%`,
          sub: "Current humidity",
          Icon: Droplets,
          tint:
            "bg-sky/15 text-sky",
        },

        {
          label: t("weather.rain"),
          value: `${weather.current.rain_probability}%`,
          sub: "Rain probability",
          Icon: CloudRain,
          tint:
            "bg-primary/12 text-primary",
        },

        {
          label: t("weather.wind"),
          value: weather.current.wind_speed,
          sub: weather.current.wind_direction,
          Icon: Wind,
          tint:
            "bg-earth/15 text-earth",
        },
      ]
    : [];


  // ==========================================================
  // WEATHER ALERTS
  // ==========================================================

  const alerts =
    weather?.alerts.map((alert) => ({
      level: alert.level,
      title: alert.title,
      body: alert.body,

      tone:
        alert.level === "High"
          ? "border-destructive/30 bg-destructive/8 text-destructive"
          : alert.level === "Medium"
          ? "border-sun/40 bg-sun/12 text-sun-foreground"
          : "border-border bg-muted",
    })) || [];


  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading && !weather) {
    return (
      <>
        <PageHeader
          eyebrow="Weather"
          title={t("weather.title")}
          subtitle={t("weather.subtitle")}
        />

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-border bg-card shadow-soft">
            <RefreshCw
              className="h-10 w-10 animate-spin text-primary"
              aria-hidden
            />

            <h2 className="mt-5 text-xl font-bold">
              Getting your current weather...
            </h2>

            <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
              We are requesting your current location and
              fetching live weather conditions.
            </p>
          </div>
        </section>
      </>
    );
  }


  // ==========================================================
  // MAIN PAGE
  // ==========================================================

  return (
    <>
      <PageHeader
        eyebrow="Weather"
        title={t("weather.title")}
        subtitle={t("weather.subtitle")}
      />


      <section className="mx-auto max-w-7xl px-4 py-12">


        {/* ====================================================
            LOCATION STATUS
        ==================================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <MapPin
                className="h-5 w-5"
                aria-hidden
              />
            </span>

            <div>
              <p className="text-sm font-bold">
                {weather?.current.location ||
                  FALLBACK_LOCATION.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {locationSource === "gps"
                  ? coordinates?.accuracy
                    ? `Using your device location · accuracy approximately ${Math.round(
                        coordinates.accuracy
                      )} m`
                    : "Using your device location"
                  : "Using Mangalore fallback location"}
              </p>
            </div>

          </div>


          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={locationLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >

            {locationLoading ? (
              <RefreshCw
                className="h-4 w-4 animate-spin"
                aria-hidden
              />
            ) : (
              <LocateFixed
                className="h-4 w-4"
                aria-hidden
              />
            )}

            {locationLoading
              ? "Locating..."
              : "Use My Location"}

          </button>

        </div>


        {/* ====================================================
            ERROR / LOCATION MESSAGE
        ==================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-sun/40 bg-sun/10 p-4">

            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-sun-foreground"
              aria-hidden
            />

            <div>
              <p className="text-sm font-semibold">
                Location notice
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {error}
              </p>
            </div>

          </div>
        )}


        {/* ====================================================
            CURRENT WEATHER + METRICS
        ==================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">


          {/* ==================================================
              MAIN WEATHER CARD
          ================================================== */}

          <div className="relative overflow-hidden rounded-[2rem] gradient-hero p-8 text-primary-foreground shadow-glow">

            <Sun
              aria-hidden
              className="absolute -right-6 -top-6 h-40 w-40 text-white/15 animate-float"
            />


            <div className="relative z-10">

              <p className="flex items-center gap-2 text-sm font-semibold opacity-90">

                <MapPin
                  className="h-4 w-4"
                  aria-hidden
                />

                {weather?.current.location ||
                  FALLBACK_LOCATION.name}

              </p>


              <p className="mt-2 font-display text-6xl font-extrabold">

                {weather
                  ? `${weather.current.temperature}°`
                  : "--"}

              </p>


              <p className="mt-1 text-lg font-semibold capitalize">

                {weather?.current.condition ||
                  "Weather unavailable"}

              </p>


              <div className="mt-8 flex flex-wrap gap-6 text-sm">

                <span className="flex items-center gap-2">

                  <Sunrise
                    className="h-5 w-5"
                    aria-hidden
                  />

                  {weather?.current.sunrise ||
                    "--"}

                </span>


                <span className="flex items-center gap-2">

                  <Sunset
                    className="h-5 w-5"
                    aria-hidden
                  />

                  {weather?.current.sunset ||
                    "--"}

                </span>


                <span className="flex items-center gap-2">

                  <Droplets
                    className="h-5 w-5"
                    aria-hidden
                  />

                  {weather
                    ? `${weather.current.humidity}% humidity`
                    : "--"}

                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              WEATHER METRICS
          ================================================== */}

          <ul className="grid grid-cols-2 gap-4">

            {metrics.map(
              ({
                label,
                value,
                sub,
                Icon,
                tint,
              }) => (
                <li
                  key={label}
                  className="card-lift rounded-3xl border border-border bg-card p-5 shadow-soft"
                >

                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${tint}`}
                  >
                    <Icon
                      className="h-5 w-5"
                      aria-hidden
                    />
                  </span>


                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>


                  <p className="font-display text-2xl font-extrabold">
                    {value}
                  </p>


                  <p className="text-xs text-muted-foreground">
                    {sub}
                  </p>

                </li>
              )
            )}

          </ul>

        </div>


        {/* ====================================================
            5-DAY FORECAST
        ==================================================== */}

        <div className="mt-8 rounded-[2rem] border border-border bg-card p-6 shadow-soft">

          <h2 className="text-lg font-bold">
            {t("weather.forecast")}
          </h2>


          {weather?.forecast &&
          weather.forecast.length > 0 ? (
            <>

              <ul className="mt-5 grid gap-3 sm:grid-cols-3 md:grid-cols-5">

                {weather.forecast.map((day) => {

                  const Icon =
                    ICONS[
                      day.icon as keyof typeof ICONS
                    ] || Cloud;


                  return (
                    <li
                      key={day.day}
                      className="card-lift rounded-2xl bg-muted p-4 text-center"
                    >

                      <p className="text-sm font-bold">
                        {day.day}
                      </p>


                      <Icon
                        className="mx-auto mt-3 h-8 w-8 text-primary"
                        aria-hidden
                      />


                      <p className="mt-3 font-display text-xl font-extrabold">
                        {day.temp}°
                      </p>


                      <p className="mt-1 text-xs text-muted-foreground">
                        {day.rain}% rain
                      </p>

                    </li>
                  );

                })}

              </ul>


              {/* ==============================================
                  RAIN CHART
              ============================================== */}

              <div className="mt-8 h-64">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart
                    data={weather.forecast}
                    margin={{
                      left: -20,
                      right: 8,
                      top: 8,
                    }}
                  >

                    <defs>

                      <linearGradient
                        id="gRain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="var(--chart-5)"
                          stopOpacity={0.5}
                        />

                        <stop
                          offset="100%"
                          stopColor="var(--chart-5)"
                          stopOpacity={0.02}
                        />

                      </linearGradient>

                    </defs>


                    <CartesianGrid
                      strokeDasharray="4 4"
                      stroke="var(--border)"
                      vertical={false}
                    />


                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />


                    <YAxis
                      domain={[0, 100]}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />


                    <Tooltip
                      formatter={(value) => [
                        `${value}%`,
                        "Rain probability",
                      ]}
                      contentStyle={{
                        borderRadius: "1rem",
                        border:
                          "1px solid var(--border)",
                        background:
                          "var(--card)",
                        color:
                          "var(--card-foreground)",
                        fontSize: "0.8rem",
                      }}
                    />


                    <Area
                      type="monotone"
                      dataKey="rain"
                      name="Rain %"
                      stroke="var(--chart-5)"
                      strokeWidth={3}
                      fill="url(#gRain)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </>
          ) : (
            <div className="mt-5 rounded-2xl bg-muted p-8 text-center">

              <Cloud
                className="mx-auto h-10 w-10 text-muted-foreground"
                aria-hidden
              />

              <p className="mt-3 text-sm font-semibold">
                Forecast unavailable
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Current weather is available, but the forecast
                could not be loaded.
              </p>

            </div>
          )}

        </div>


        {/* ====================================================
            WEATHER ALERTS
        ==================================================== */}

        <div className="mt-8">

          <h2 className="text-lg font-bold">
            {t("weather.alerts")}
          </h2>


          {alerts.length > 0 ? (
            <ul className="mt-4 grid gap-4 md:grid-cols-2">

              {alerts.map((alert, index) => (

                <li
                  key={`${alert.title}-${index}`}
                  className={`rounded-3xl border p-6 ${alert.tone}`}
                >

                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">

                    <AlertTriangle
                      className="h-4 w-4"
                      aria-hidden
                    />

                    {alert.level} priority

                  </p>


                  <h3 className="mt-2 text-lg font-bold text-foreground">
                    {alert.title}
                  </h3>


                  <p className="mt-1 text-sm text-muted-foreground">
                    {alert.body}
                  </p>

                </li>

              ))}

            </ul>
          ) : (
            <div className="mt-4 rounded-3xl border border-border bg-card p-6">

              <p className="text-sm text-muted-foreground">
                No weather alerts at the moment.
              </p>

            </div>
          )}

        </div>

      </section>
    </>
  );
}