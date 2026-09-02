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

import { PageHeader } from "@/components/PageHeader";

import { useI18n } from "@/i18n/I18nProvider";

import {
  api,
  MandiListResponse,
} from "@/lib/api";

import {
  useEffect,
  useState,
} from "react";

import mandiImg from "@/assets/mandi.jpg";


// ============================================================
// ROUTE
// ============================================================

export const Route =
  createFileRoute("/mandi")({
    head: () => ({
      meta: [
        {
          title:
            "Nearby Karnataka Tomato Mandis — AgriWise Intelligence",
        },

        {
          name:
            "description",

          content:
            "Find all available Karnataka tomato mandis from your current GPS location, sorted from nearest to farthest.",
        },

        {
          property:
            "og:title",

          content:
            "Nearby Karnataka Tomato Mandis — AgriWise Intelligence",
        },

        {
          property:
            "og:description",

          content:
            "Find Karnataka tomato markets using your real GPS location.",
        },
      ],
    }),

    component:
      MandiPage,
  });


// ============================================================
// PAGE
// ============================================================

function MandiPage() {

  const { t } =
    useI18n();

  const [
    mandiData,
    setMandiData,
  ] =
    useState<MandiListResponse | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    locationReady,
    setLocationReady,
  ] =
    useState(false);

  const [
    userLocation,
    setUserLocation,
  ] =
    useState<{
      latitude: number;
      longitude: number;
    } | null>(
      null
    );


  // ==========================================================
  // FIND ALL KARNATAKA MANDIS
  // ==========================================================

  const findNearbyMandis =
    async () => {

      setLoading(
        true
      );

      setError(
        null
      );

      try {

        // ------------------------------------------------------
        // Get actual browser GPS.
        // ------------------------------------------------------

        const location =
          await api.getBrowserLocation();

        setUserLocation(
          location
        );

        console.log(
          "============================================================"
        );

        console.log(
          "[MANDI PAGE] User GPS"
        );

        console.log(
          "[MANDI PAGE] Latitude:",
          location.latitude
        );

        console.log(
          "[MANDI PAGE] Longitude:",
          location.longitude
        );

        console.log(
          "[MANDI PAGE] Requesting ALL Karnataka tomato mandis"
        );

        console.log(
          "============================================================"
        );


        // ------------------------------------------------------
        // Ask backend for ALL Karnataka tomato mandis.
        //
        // No radius.
        // No limit.
        // ------------------------------------------------------

        const data =
          await api.getNearbyMandis(
            location.latitude,
            location.longitude
          );


        // ------------------------------------------------------
        // Safety sorting on frontend.
        //
        // Backend should already sort these.
        // This guarantees nearest -> farthest
        // even if backend ordering changes.
        // ------------------------------------------------------

        const sortedMandis =
          [
            ...(data.mandis || [])
          ].sort(
            (
              a,
              b
            ) =>
              Number(
                a.distance
              ) -
              Number(
                b.distance
              )
          );


        setMandiData({
          ...data,

          mandis:
            sortedMandis,

          mandi_count:
            sortedMandis.length,

          total_available:
            sortedMandis.length,

          sorted_by:
            "distance_ascending",
        });


        setLocationReady(
          true
        );

      } catch (
        err
      ) {

        console.error(
          "[MANDI PAGE] Failed:",
          err
        );

        const message =
          err instanceof Error
            ? err.message
            : "Unable to find Karnataka mandis.";

        setError(
          message
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(
    () => {

      findNearbyMandis();

    },
    []
  );


  // ==========================================================
  // GOOGLE MAPS DIRECTIONS
  // ==========================================================

  const openDirections =
    (
      mandiName: string,
      latitude?: number | null,
      longitude?: number | null
    ) => {

      let url: string;


      // ------------------------------------------------------
      // Prefer exact mandi coordinates when available.
      // ------------------------------------------------------

      if (
        typeof latitude ===
          "number" &&
        typeof longitude ===
          "number" &&
        Number.isFinite(
          latitude
        ) &&
        Number.isFinite(
          longitude
        )
      ) {

        url =
          `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

      } else {

        const query =
          encodeURIComponent(
            `${mandiName}, Karnataka, India`
          );

        url =
          `https://www.google.com/maps/dir/?api=1&destination=${query}`;
      }


      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title={t(
          "mandi.title"
        )}
        subtitle={
          t(
            "mandi.subtitle"
          )
        }
      />


      <section className="mx-auto max-w-7xl px-4 py-12">


        {/* ================================================== */}
        {/* HERO / LOCATION HEADER */}
        {/* ================================================== */}

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


          {/* ================================================= */}
          {/* LOCATION INFORMATION */}
          {/* ================================================= */}

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-primary-foreground">

            <div className="min-w-0">

              <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                Karnataka tomato markets
              </p>


              <p className="mt-1 font-display text-2xl font-extrabold">

                {loading
                  ? "Finding Karnataka mandis..."
                  : `${mandiData?.mandi_count ?? 0} mandis found`}
              </p>


              <p className="text-sm opacity-85">

                {locationReady &&
                userLocation
                  ? "Sorted from nearest to farthest from your location"
                  : "Use your location to find nearby mandis"}

              </p>

            </div>


            <Button
              variant="glass"
              size="lg"
              onClick={
                findNearbyMandis
              }
              disabled={
                loading
              }
            >

              {loading ? (
                <RefreshCw
                  className="animate-spin"
                  aria-hidden
                />
              ) : (
                <Locate
                  aria-hidden
                />
              )}


              {loading
                ? "Locating..."
                : "Use my location"}

            </Button>

          </div>


          {/* ================================================= */}
          {/* DECORATIVE MAP MARKERS */}
          {/* ================================================= */}

          {[
            {
              top: "24%",
              left: "18%",
            },

            {
              top: "44%",
              left: "62%",
            },

            {
              top: "62%",
              left: "36%",
            },

            {
              top: "32%",
              left: "80%",
            },

          ].map(
            (
              position,
              index
            ) => (

              <span
                key={index}
                aria-hidden
                style={
                  position
                }
                className="absolute grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-float"
              >

                <MapPin
                  className="h-4 w-4"
                />

              </span>

            )
          )}

        </div>


        {/* ================================================== */}
        {/* LOCATION STATUS */}
        {/* ================================================== */}

        {locationReady &&
          userLocation &&
          !loading && (

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">

            <div>

              <p className="text-sm font-bold">
                All Karnataka tomato mandis
              </p>

              <p className="mt-1 text-xs text-muted-foreground">

                Showing all available markets returned
                by the backend, ordered by distance
                from your GPS location.

              </p>

            </div>


            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">

              {mandiData?.mandi_count ?? 0} markets

            </div>

          </div>

        )}


        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {error && (

          <div className="mt-8 flex items-start gap-3 rounded-3xl border border-destructive/30 bg-destructive/10 p-5">

            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
            />


            <div>

              <p className="font-bold text-destructive">
                Unable to find nearby mandis
              </p>


              <p className="mt-1 text-sm text-muted-foreground">
                {error}
              </p>


              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={
                  findNearbyMandis
                }
              >

                <RefreshCw
                  aria-hidden
                />

                Try again

              </Button>

            </div>

          </div>

        )}


        {/* ================================================== */}
        {/* LOADING */}
        {/* ================================================== */}

        {loading && (

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {[
              1,
              2,
              3,
              4,
              5,
              6,
            ].map(
              (
                item
              ) => (

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

              )
            )}

          </div>

        )}


        {/* ================================================== */}
        {/* NO RESULTS */}
        {/* ================================================== */}

        {!loading &&
          !error &&
          mandiData &&
          mandiData.mandis.length ===
            0 && (

          <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center shadow-soft">

            <MapPin
              className="mx-auto h-10 w-10 text-muted-foreground"
            />


            <h2 className="mt-4 text-xl font-bold">
              No Karnataka mandis found
            </h2>


            <p className="mt-2 text-sm text-muted-foreground">

              The backend did not return any
              Karnataka tomato markets.

            </p>


            <Button
              variant="hero"
              className="mt-5"
              onClick={
                findNearbyMandis
              }
            >

              <RefreshCw
                aria-hidden
              />

              Search again

            </Button>

          </div>

        )}


        {/* ================================================== */}
        {/* MANDI CARDS */}
        {/* ================================================== */}

        {!loading &&
          mandiData &&
          mandiData.mandis.length >
            0 && (

          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {mandiData.mandis.map(
              (
                mandi,
                index
              ) => {

                const up =
                  mandi.trend >=
                  0;

                const Trend =
                  up
                    ? TrendingUp
                    : TrendingDown;


                return (

                  <li
                    key={`${mandi.name}-${mandi.city}-${index}`}
                    className="card-lift flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
                  >


                    {/* ====================================== */}
                    {/* RANK + HEADER */}
                    {/* ====================================== */}

                    <div className="flex items-start gap-3">

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">

                        {index + 1}

                      </span>


                      <div className="min-w-0 flex-1">

                        <h2 className="truncate text-lg font-bold">
                          {mandi.name}
                        </h2>

                        <p className="truncate text-sm text-muted-foreground">
                          {mandi.city}
                        </p>

                      </div>


                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-sun/20 px-3 py-1 text-xs font-bold text-sun-foreground">

                        <Star
                          className="h-3.5 w-3.5 fill-current"
                          aria-hidden
                        />

                        {Number(
                          mandi.rating
                        ).toFixed(1)}

                      </span>

                    </div>


                    {/* ====================================== */}
                    {/* PRICE */}
                    {/* ====================================== */}

                    <div className="mt-5 rounded-2xl bg-primary/8 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Tomato market price
                      </p>


                      <p className="mt-1 flex flex-wrap items-baseline gap-2">

                        {mandi.price >
                        0 ? (

                          <>

                            <span className="font-display text-2xl font-extrabold text-primary">

                              ₹
                              {Number(
                                mandi.price
                              ).toLocaleString(
                                "en-IN"
                              )}

                            </span>


                            <span className="text-xs text-muted-foreground">
                              / quintal
                            </span>

                          </>

                        ) : (

                          <span className="text-sm font-semibold text-muted-foreground">
                            Price unavailable
                          </span>

                        )}


                        {mandi.trend !==
                          0 && (

                          <span
                            className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                              up
                                ? "bg-primary/15 text-primary"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >

                            <Trend
                              className="h-3.5 w-3.5"
                              aria-hidden
                            />

                            {up
                              ? "+"
                              : ""}

                            {mandi.trend}
                            %

                          </span>

                        )}

                      </p>

                    </div>


                    {/* ====================================== */}
                    {/* DISTANCE + TRAVEL */}
                    {/* ====================================== */}

                    <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">

                      <div className="rounded-2xl bg-muted px-3 py-2.5">

                        <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">

                          <Navigation
                            className="h-3.5 w-3.5"
                            aria-hidden
                          />

                          Distance

                        </dt>


                        <dd className="mt-0.5 font-bold">

                          {Number(
                            mandi.distance
                          ).toFixed(1)}{" "}
                          km

                        </dd>

                      </div>


                      <div className="rounded-2xl bg-muted px-3 py-2.5">

                        <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">

                          <Clock
                            className="h-3.5 w-3.5"
                            aria-hidden
                          />

                          Travel

                        </dt>


                        <dd className="mt-0.5 font-bold">

                          {mandi.travel ||
                            "—"}

                        </dd>

                      </div>

                    </dl>


                    {/* ====================================== */}
                    {/* CROPS */}
                    {/* ====================================== */}

                    {mandi.crops &&
                      mandi.crops.length >
                        0 && (

                      <ul className="mt-4 flex flex-wrap gap-2">

                        {mandi.crops.map(
                          (
                            crop
                          ) => (

                            <li
                              key={crop}
                              className="rounded-full bg-sprout/25 px-3 py-1 text-xs font-semibold text-sprout-foreground"
                            >

                              {crop}

                            </li>

                          )
                        )}

                      </ul>

                    )}


                    {/* ====================================== */}
                    {/* DIRECTIONS */}
                    {/* ====================================== */}

                    <Button
                      variant="hero"
                      size="lg"
                      className="mt-6 w-full"
                      onClick={() =>
                        openDirections(
                          mandi.name,
                          mandi.latitude,
                          mandi.longitude
                        )
                      }
                    >

                      <Navigation
                        aria-hidden
                      />

                      Get directions

                    </Button>

                  </li>

                );
              }
            )}

          </ul>

        )}


        {/* ================================================== */}
        {/* CEDA CREDIT */}
        {/* ================================================== */}

        {!loading &&
          mandiData &&
          mandiData.mandis.length >
            0 && (

          <p className="mt-10 text-center text-xs text-muted-foreground">

            Market data powered by
            CEDA / Agmarknet.
            CEDA requires attribution when its data
            is used in applications. :contentReference[oaicite:1]{index=1}

          </p>

        )}

      </section>
    </>
  );
}