import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera,
  Images,
  RefreshCw,
  Sparkles,
  Leaf,
  BadgeIndianRupee,
  MapPin,
  CheckCircle2,
  XCircle,
  X,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";
import { api } from "@/lib/api";
import { toast } from "sonner";

type CropPredictionResponse = {
  crop: string;
  grade: string;
  is_tomato: boolean;
  confidence: number;
  freshness: number;
  quality: number;
  price: number;
  recommendation: string;
  best_market: {
    name: string;
    distance_km: number;
    travel_time: string;
  };
};

export const Route = createFileRoute("/crop-grading")({
  head: () => ({
    meta: [
      { title: "AI Crop Grading — EcoAgri Intelligence" },
      {
        name: "description",
        content:
          "Upload or capture a photo of your tomato and get instant AI grade, freshness, quality score and market information.",
      },
      {
        property: "og:title",
        content: "AI Crop Grading — EcoAgri Intelligence",
      },
      {
        property: "og:description",
        content:
          "Instant tomato quality grading from a smartphone or webcam photo.",
      },
    ],
  }),
  component: CropGrading,
});

function CropGrading() {
  const { t } = useI18n();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<CropPredictionResponse | null>(null);

  // Camera state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraStream, setCameraStream] =
    useState<MediaStream | null>(null);

  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    // Release old preview URL
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);

    setPreview(url);
    startAnalysis(file);
  };

  const startAnalysis = async (file: File) => {
    setResult(null);
    setLoading(true);

    try {
      const prediction = await api.predictCrop(file);
      setResult(prediction as CropPredictionResponse);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Prediction failed"
      );

      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================
   * OPEN CAMERA
   * ============================================
   */
  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        toast.error(
          "Camera access is not supported by this browser."
        );
        return;
      }

      // Stop any previous camera stream
      stopCamera();

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      streamRef.current = stream;
      setCameraStream(stream);

      setCameraOpen(true);
      setCameraReady(false);
    } catch (error) {
      console.error("Camera error:", error);

      if (
        error instanceof DOMException &&
        error.name === "NotAllowedError"
      ) {
        toast.error(
          "Camera permission was denied. Please allow camera access in your browser."
        );
      } else if (
        error instanceof DOMException &&
        error.name === "NotFoundError"
      ) {
        toast.error(
          "No camera was found on this device."
        );
      } else {
        toast.error(
          "Unable to access the camera. Please check your browser permissions."
        );
      }
    }
  };

  /*
   * ============================================
   * STOP CAMERA
   * ============================================
   */
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    setCameraStream(null);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraReady(false);
  };

  useEffect(() => {
    if (!cameraOpen || !cameraStream || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    video.srcObject = cameraStream;

    const startPreview = async () => {
      try {
        await video.play();
        setCameraReady(video.readyState >= 2);
      } catch {
        toast.error("Unable to start camera preview.");
      }
    };

    if (video.readyState >= 2) {
      void startPreview();
    } else {
      video.addEventListener("loadedmetadata", startPreview, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", startPreview);
    };
  }, [cameraOpen, cameraStream]);

  /*
   * ============================================
   * CLOSE CAMERA
   * ============================================
   */
  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
  };

  /*
   * ============================================
   * CAPTURE IMAGE FROM CAMERA
   * ============================================
   */
  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) {
      toast.error("Camera is not ready.");
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      toast.error("Camera is still starting. Please wait.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      toast.error("Unable to capture photo.");
      return;
    }

    // Draw current camera frame
    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Unable to create image.");
          return;
        }

        const file = new File(
          [blob],
          `tomato-camera-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        closeCamera();
        handleFile(file);
      },
      "image/jpeg",
      0.92
    );
  };

  /*
   * ============================================
   * RESET
   * ============================================
   */
  const reset = () => {
    stopCamera();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setResult(null);
    setLoading(false);
  };

  /*
   * ============================================
   * CLEAN CAMERA WHEN PAGE UNMOUNTS
   * ============================================
   */
  useEffect(() => {
    return () => {
      stopCamera();

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="AI Vision"
        title={t("grading.title")}
        subtitle={t("grading.subtitle")}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">

          {/* =========================================
              UPLOAD / CAMERA SECTION
          ========================================== */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8">

            <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center md:p-10">

              {preview ? (
                <div className="zoom-media rounded-2xl">
                  <img
                    src={preview}
                    alt="Preview of uploaded tomato"
                    className="mx-auto h-64 w-full rounded-2xl object-cover"
                  />
                </div>
              ) : (
                <>
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl gradient-hero shadow-glow">
                    <Camera
                      className="h-9 w-9 text-primary-foreground"
                      aria-hidden
                    />
                  </span>

                  <p className="mt-5 text-lg font-bold">
                    Add a photo of your tomato
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Capture a tomato using your camera or upload an image
                    from your gallery.
                  </p>
                </>
              )}

              {/* =====================================
                  BUTTONS
              ====================================== */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                <Button
                  size="xl"
                  variant="hero"
                  onClick={openCamera}
                  type="button"
                >
                  <Camera aria-hidden />
                  {t("grading.capture")}
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  onClick={() =>
                    galleryRef.current?.click()
                  }
                  type="button"
                >
                  <Images aria-hidden />
                  {t("grading.gallery")}
                </Button>

              </div>

              {/* =====================================
                  GALLERY INPUT
              ====================================== */}
              <input
                ref={galleryRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                aria-label={t("grading.gallery")}
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);

                  // Allow selecting the same image again
                  e.currentTarget.value = "";
                }}
              />

              {/* =====================================
                  MOBILE FALLBACK CAMERA INPUT
              ====================================== */}
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                aria-label={t("grading.capture")}
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);

                  e.currentTarget.value = "";
                }}
              />

              {!preview && (
                <button
                  type="button"
                  onClick={() => {
                    toast.info("Please capture or upload a tomato image first.");
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  <Sparkles
                    className="h-4 w-4"
                    aria-hidden
                  />
                  Try it with a sample tomato photo
                </button>
              )}

              {preview && (
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={reset}
                  type="button"
                >
                  <RefreshCw aria-hidden />
                  {t("grading.retake")}
                </Button>
              )}
            </div>

            {/* =========================================
                FEATURES
            ========================================== */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Colour & ripeness",
                "Size uniformity",
                "Defect detection",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 rounded-2xl bg-muted px-3 py-2.5 text-xs font-medium"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {s}
                </li>
              ))}
            </ul>

            {/* =========================================
                TOMATO ONLY NOTICE
            ========================================== */}
            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
              <p className="font-bold text-primary">
                🍅 Tomato-only analysis
              </p>

              <p className="mt-1 text-muted-foreground">
                Please upload or capture a clear tomato image.
                Images of people, animals, vehicles, buildings or
                other objects will not be analyzed as tomatoes.
              </p>
            </div>
          </div>

          {/* =========================================
              RESULT SECTION
          ========================================== */}
          <div>

            {loading && (
              <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft">

                <div className="flex items-center gap-3">

                  <span className="grid h-12 w-12 animate-spin place-items-center rounded-full border-4 border-primary/20 border-t-primary" />

                  <div>
                    <p className="font-bold">
                      {t("grading.analyzing")}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Checking whether the image contains a tomato
                      and analyzing its quality...
                    </p>
                  </div>

                </div>

                <div className="mt-8 space-y-4">
                  <Skeleton className="h-6 w-2/3 rounded-full" />
                  <Skeleton className="h-24 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-5/6 rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                </div>

              </div>
            )}

            {!loading && result && (
              <ResultCard result={result} />
            )}

            {!loading && !result && (
              <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-muted/40 p-10 text-center">

                <Leaf
                  className="h-12 w-12 animate-sway text-primary/40"
                  aria-hidden
                />

                <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                  Your tomato quality report — grade, freshness,
                  price and selling advice — appears here.
                </p>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* ============================================
          CAMERA MODAL
      ============================================ */}
      {cameraOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Tomato camera"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-card shadow-2xl">

            {/* Camera Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">

              <div>
                <h2 className="font-display text-lg font-bold">
                  Capture Tomato Photo
                </h2>

                <p className="text-xs text-muted-foreground">
                  Position the tomato clearly inside the camera.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={closeCamera}
                type="button"
                aria-label="Close camera"
              >
                <X />
              </Button>
            </div>

            {/* Camera Preview */}
            <div className="relative bg-black">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="aspect-video h-auto w-full object-cover"
              />

              {/* Tomato guide */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

                <div className="h-56 w-72 rounded-[45%] border-2 border-dashed border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.15)] sm:h-64 sm:w-96" />

              </div>

              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">

                  <div className="text-center text-white">

                    <span className="mx-auto mb-3 grid h-12 w-12 animate-spin place-items-center rounded-full border-4 border-white/20 border-t-white" />

                    <p className="text-sm font-semibold">
                      Starting camera...
                    </p>

                  </div>

                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:justify-center">

              <Button
                variant="outline"
                size="lg"
                onClick={closeCamera}
                type="button"
                className="sm:flex-1"
              >
                <X />
                Cancel
              </Button>

              <Button
                variant="hero"
                size="lg"
                onClick={capturePhoto}
                disabled={!cameraReady}
                type="button"
                className="sm:flex-1"
              >
                <Camera />
                Capture Tomato
              </Button>

            </div>

            <div className="px-5 pb-5 text-center text-xs text-muted-foreground">
              Make sure the tomato is well lit and clearly visible.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   GRADE COLOR CONFIGURATION
========================================================= */

function getGradeConfig(grade: string) {
  const normalized = String(grade || "").toUpperCase();

  if (normalized.includes("A")) {
    return {
      header:
        "bg-green-100 dark:bg-green-950/70 border-b border-green-300 dark:border-green-800",
      eyebrow:
        "text-green-700 dark:text-green-300",
      title:
        "text-green-800 dark:text-green-200",
      gradeBox:
        "border-green-400 bg-green-50 dark:bg-green-900/40 dark:border-green-600",
      gradeText:
        "text-green-700 dark:text-green-200",
      status:
        "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-950/60 dark:text-green-300",
      statusIcon:
        "text-green-600 dark:text-green-400",
      recommendation:
        "border-green-300 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/50 dark:text-green-100",
      recommendationTitle:
        "text-green-700 dark:text-green-300",
      accent:
        "text-green-700 dark:text-green-300",
      price:
        "text-green-700 dark:text-green-300",
    };
  }

  if (normalized.includes("B")) {
    return {
      header:
        "bg-orange-100 dark:bg-orange-950/70 border-b border-orange-300 dark:border-orange-800",
      eyebrow:
        "text-orange-700 dark:text-orange-300",
      title:
        "text-orange-800 dark:text-orange-200",
      gradeBox:
        "border-orange-400 bg-orange-50 dark:bg-orange-900/40 dark:border-orange-600",
      gradeText:
        "text-orange-700 dark:text-orange-200",
      status:
        "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700 dark:bg-orange-950/60 dark:text-orange-300",
      statusIcon:
        "text-orange-600 dark:text-orange-400",
      recommendation:
        "border-orange-300 bg-orange-50 text-orange-950 dark:border-orange-700 dark:bg-orange-950/50 dark:text-orange-100",
      recommendationTitle:
        "text-orange-700 dark:text-orange-300",
      accent:
        "text-orange-700 dark:text-orange-300",
      price:
        "text-orange-700 dark:text-orange-300",
    };
  }

  return {
    header:
      "bg-red-100 dark:bg-red-950/70 border-b border-red-300 dark:border-red-800",
    eyebrow:
      "text-red-700 dark:text-red-300",
    title:
      "text-red-800 dark:text-red-200",
    gradeBox:
      "border-red-400 bg-red-50 dark:bg-red-900/40 dark:border-red-600",
    gradeText:
      "text-red-700 dark:text-red-200",
    status:
      "border-red-300 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-950/60 dark:text-red-300",
    statusIcon:
      "text-red-600 dark:text-red-400",
    recommendation:
      "border-red-300 bg-red-50 text-red-950 dark:border-red-700 dark:bg-red-950/50 dark:text-red-100",
    recommendationTitle:
      "text-red-700 dark:text-red-300",
    accent:
      "text-red-700 dark:text-red-300",
    price:
      "text-red-700 dark:text-red-300",
  };
}

/* =========================================================
   RESULT CARD
========================================================= */

function ResultCard({
  result,
}: {
  result: CropPredictionResponse;
}) {
  const { t } = useI18n();

  const gradeConfig = getGradeConfig(result.grade);

  const normalizedGrade =
    String(result.grade || "").toUpperCase();

  const accepted =
    result.is_tomato === true &&
    result.grade !== "Rejected";

  const bars = [
    {
      label: t("grading.confidence"),
      value: result.confidence,
      className: "bg-primary",
    },
    {
      label: t("grading.freshness"),
      value: result.freshness,
      className: "bg-sprout",
    },
    {
      label: t("grading.quality"),
      value: result.quality,
      className: "bg-sun",
    },
  ];

  /*
   * Non-tomato result
   */
  const isUnknownCrop =
    String(result.crop || "").toLowerCase() === "unknown";

  return (
    <article className="animate-rise overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">

      {/* =========================================
          RESULT HEADER
      ========================================== */}
      <header
        className={`px-7 py-6 ${gradeConfig.header}`}
      >

        <p
          className={`text-xs font-bold uppercase tracking-wider ${gradeConfig.eyebrow}`}
        >
          {t("grading.result")}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2
              className={`text-2xl font-extrabold ${gradeConfig.title}`}
            >
              {result.crop}
            </h2>

            <p
              className={`mt-1 text-sm font-semibold ${gradeConfig.accent}`}
            >
              {t("grading.grade")}
            </p>
          </div>

          <div
            className={`rounded-3xl border-2 px-6 py-3 text-center ${gradeConfig.gradeBox}`}
          >
            <p
              className={`text-[11px] font-bold uppercase tracking-wider ${gradeConfig.gradeText}`}
            >
              {t("grading.grade")}
            </p>

            <p
              className={`mt-1 text-3xl font-extrabold ${gradeConfig.gradeText}`}
            >
              {result.grade}
            </p>
          </div>
        </div>

        {/* ACCEPTED / REJECTED */}

        <div
          className={`mt-5 flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold ${gradeConfig.status}`}
        >
          {accepted ? (
            <CheckCircle2
              className={`h-5 w-5 ${gradeConfig.statusIcon}`}
              aria-hidden
            />
          ) : (
            <XCircle
              className={`h-5 w-5 ${gradeConfig.statusIcon}`}
              aria-hidden
            />
          )}

          <span>
            {accepted
              ? "Accepted"
              : "Rejected"}
          </span>
        </div>
      </header>

      {/* =========================================
          RESULT BODY
      ========================================== */}
      <div className="space-y-6 bg-card px-7 py-7">

        {/* NON-TOMATO MESSAGE */}

        {isUnknownCrop && (
          <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5 text-red-900 dark:border-red-700 dark:bg-red-950/40 dark:text-red-100">

            <p className="text-sm font-bold uppercase tracking-wide text-red-700 dark:text-red-300">
              Tomato image required
            </p>

            <p className="mt-2 text-sm font-medium leading-relaxed">
              Please upload or capture a clear tomato image.
              The uploaded image does not appear to contain a
              tomato, so tomato quality analysis was not performed.
            </p>

            <p className="mt-3 text-xs opacity-80">
              Try again with a well-lit tomato centered in the
              camera frame.
            </p>
          </div>
        )}

        {/* SCORE BARS */}

        {!isUnknownCrop && (
          <dl className="space-y-5">

            {bars.map((b) => (
              <div key={b.label}>

                <div className="flex items-center justify-between text-sm font-semibold">

                  <dt>{b.label}</dt>

                  <dd>{b.value}%</dd>

                </div>

                <Progress
                  value={b.value}
                  className="mt-2 h-3 bg-muted"
                  indicatorClassName={b.className}
                />
              </div>
            ))}

          </dl>
        )}

        {/* PRICE + MARKET */}

        {!isUnknownCrop && (
          <div className="grid gap-3 sm:grid-cols-2">

            <div className="rounded-2xl border border-border bg-primary/5 p-4 dark:bg-white/5">

              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">

                <BadgeIndianRupee
                  className="h-4 w-4 text-primary"
                  aria-hidden
                />

                {t("grading.price")}
              </p>

              <p
                className={`mt-1 font-display text-2xl font-extrabold ${gradeConfig.price}`}
              >
                ₹
                {result.price.toLocaleString("en-IN")}

                <span className="ml-1 text-sm font-semibold text-muted-foreground">
                  / quintal
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-sand p-4 text-sand-foreground dark:bg-amber-950/50 dark:text-amber-100">

              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">

                <MapPin
                  className="h-4 w-4"
                  aria-hidden
                />

                {t("grading.bestMarket")}
              </p>

              <p className="mt-1 font-display text-lg font-extrabold">
                {result.best_market.name}
              </p>

              <p className="text-xs opacity-80">
                {result.best_market.distance_km} km ·{" "}
                {result.best_market.travel_time} away
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            RECOMMENDATION
        ========================================== */}

        <div
          className={`rounded-2xl border-2 p-5 shadow-sm ${gradeConfig.recommendation}`}
        >

          <p
            className={`text-xs font-bold uppercase tracking-wide ${gradeConfig.recommendationTitle}`}
          >
            {t("grading.recommendation")}
          </p>

          <p className="mt-2 text-sm font-medium leading-relaxed whitespace-pre-line">
            {result.recommendation}
          </p>
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-col gap-3 sm:flex-row">

          <Button
            asChild
            variant="hero"
            size="lg"
            className="flex-1"
          >
            <Link to="/mandi">
              {t("mandi.title")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <Link to="/price-prediction">
              {t("price.title")}
            </Link>
          </Button>

        </div>
      </div>
    </article>
  );
}