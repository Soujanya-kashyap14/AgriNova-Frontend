import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

// ============================================================
// BASE URL
// ============================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api";

// ============================================================
// AXIOS CLIENT
// ============================================================

const client: AxiosInstance =
  axios.create({
    baseURL: API_BASE_URL,

    timeout: 60000,

    headers: {
      "Content-Type":
        "application/json",
    },
  });

// ============================================================
// TYPES
// ============================================================

export interface WeatherCurrent {
  location: string;
  temperature: number;
  condition: string;
  feels_like: number;
  humidity: number;
  rain_probability: number;
  wind_speed: string;
  wind_direction: string;
  sunrise: string;
  sunset: string;
}

export interface WeatherForecastDay {
  day: string;
  temp: number;
  min_temp: number;
  max_temp: number;
  rain: number;
  rain_mm: number;
  precipitation_mm: number;
  icon: string;
  condition: string;
}

export interface WeatherAlert {
  level: string;
  title: string;
  body: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  alerts: WeatherAlert[];
}

// ============================================================
// CROP PREDICTION
// ============================================================

export interface CropPrediction {
  crop_type?: string;

  grade?: string;

  confidence?: number;

  freshness?: number;

  quality?: number;

  ripeness?: number | null;

  defect_detected?: boolean;

  defect_type?: string | null;

  class_name?: string;

  class_probabilities?: Record<
    string,
    number
  >;

  [key: string]: unknown;
}

// ============================================================
// MANDI TYPES
// ============================================================

export interface MandiItem {
  name: string;

  city: string;

  distance: number;

  price: number;

  rating: number;

  travel: string;

  trend: number;

  crops: string[];

  latitude?: number;

  longitude?: number;
}

export interface MandiListResponse {
  mandis: MandiItem[];

  mandi_count: number;

  radius_km: number | null;

  region: string;

  last_updated: string;

  search_mode?: string;

  sorted_by?: string;

  sort_order?: string;

  farthest_distance_km?: number;

  location_label?: string;

  searched_latitude?: number;

  searched_longitude?: number;

  ceda_live?: boolean;
}

export interface MandiStatus {
  database_exists: boolean;

  database_path: string;

  total_markets: number;

  markets_with_coordinates: number;

  markets_without_coordinates: number;
}

// ============================================================
// AUTH TYPES
// ============================================================

export interface UserProfile {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  village?: string;
  district?: string;
  state?: string;
  landArea?: number;
  location?: string;
  farm_size?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export interface LoginPayload {
  phone?: string;
  email?: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  phone?: string;
  email?: string;
  password: string;
  village: string;
  district: string;
  state: string;
  landArea: number;
}

export interface DashboardStats {
  analyses: number | string;
  grade1_pct: string;
  markets: number | string;
}

export interface DashboardProfile {
  initials: string;
  name: string;
  location: string;
  farm_size: string;
  stats: DashboardStats;
  season_earnings: number;
  season_change_pct: number;
}

export interface EarningsPoint {
  month: string;
  earnings: number;
}

export interface EarningsResponse {
  earnings: EarningsPoint[];
}

export interface ScanHistoryItem {
  id: string;
  crop: string;
  grade: string;
  score: number;
  date: string;
  price: number;
  image_url?: string | null;
}

export interface ScanHistoryResponse {
  scans: ScanHistoryItem[];
  total: number;
}

export interface PredictionHistoryItem {
  crop: string;
  predicted_price: number;
  actual_price: number;
  accurate: boolean;
  date: string;
}

export interface PredictionHistoryResponse {
  predictions: PredictionHistoryItem[];
}

// ============================================================
// AUTH
// ============================================================

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
  }
  return fallback;
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function login(
  payload: LoginPayload
): Promise<AuthResponse> {
  try {
    const response = await client.post<AuthResponse>(
      "/auth/login",
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, "Invalid phone/email or password.")
    );
  }
}

export async function signup(
  payload: SignupPayload
): Promise<AuthResponse> {
  try {
    const response = await client.post<AuthResponse>(
      "/auth/signup",
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, "Registration failed.")
    );
  }
}

export function setToken(
  token: string,
  persistence: "local" | "session" = "local"
): void {
  if (typeof window === "undefined") return;

  // Clear both stores (and the legacy "access_token" key) first so a
  // stale token from a previous "remember me" choice never lingers
  // alongside the new one.
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("access_token");

  const store = persistence === "session" ? sessionStorage : localStorage;
  store.setItem("token", token);
}

export function logout(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("access_token");
}

export async function getCurrentUser(): Promise<UserProfile> {
  const response = await client.get<UserProfile>("/auth/me");
  return response.data;
}

// ============================================================
// TOKEN
// ============================================================

function getToken(): string | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
}

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

client.interceptors.request.use(
  (config) => {
    const token =
      getToken();

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

client.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    if (
      error?.response?.status ===
      401
    ) {
      console.warn(
        "[API] Authentication expired."
      );

      // A 401 means the stored token is invalid or expired. Clear it
      // so isAuthenticated() (a simple "is there a token?" check)
      // stops reporting a logged-in state that the backend already
      // rejected - otherwise every page keeps trying authenticated
      // requests that can only ever fail.
      logout();
    }

    return Promise.reject(
      error
    );
  }
);

// ============================================================
// BROWSER GPS
// ============================================================

export function getBrowserLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise(
    (
      resolve,
      reject
    ) => {

      if (
        typeof navigator ===
          "undefined" ||
        !navigator.geolocation
      ) {
        reject(
          new Error(
            "Geolocation is not supported by this browser."
          )
        );

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          console.log(
            "=========================================="
          );

          console.log(
            "[GPS] Location received"
          );

          console.log(
            "[GPS] Latitude:",
            latitude
          );

          console.log(
            "[GPS] Longitude:",
            longitude
          );

          console.log(
            "[GPS] Accuracy:",
            position.coords.accuracy,
            "meters"
          );

          console.log(
            "=========================================="
          );

          resolve({
            latitude,
            longitude,
          });
        },

        (error) => {

          console.error(
            "[GPS] Error:",
            error
          );

          switch (
            error.code
          ) {

            case error.PERMISSION_DENIED:

              reject(
                new Error(
                  "Location permission was denied. Please allow location access for this website."
                )
              );

              break;

            case error.POSITION_UNAVAILABLE:

              reject(
                new Error(
                  "Your current location could not be determined."
                )
              );

              break;

            case error.TIMEOUT:

              reject(
                new Error(
                  "Location request timed out. Please try again."
                )
              );

              break;

            default:

              reject(
                new Error(
                  "Unable to determine your current location."
                )
              );
          }
        },

        {
          enableHighAccuracy:
            true,

          timeout:
            15000,

          maximumAge:
            0,
        }
      );
    }
  );
}

// ============================================================
// WEATHER
// ============================================================

export async function getWeather(
  lat?: number,
  lng?: number,
  location?: string
): Promise<WeatherData> {

  let latitude =
    lat;

  let longitude =
    lng;

  if (
    latitude === undefined ||
    longitude === undefined ||
    latitude === null ||
    longitude === null
  ) {

    const locationData =
      await getBrowserLocation();

    latitude =
      locationData.latitude;

    longitude =
      locationData.longitude;
  }

  if (
    !Number.isFinite(
      latitude
    ) ||
    !Number.isFinite(
      longitude
    )
  ) {
    throw new Error(
      "Invalid GPS coordinates."
    );
  }

  const params =
    new URLSearchParams();

  params.set(
    "lat",
    String(latitude)
  );

  params.set(
    "lng",
    String(longitude)
  );

  if (
    location &&
    location.trim()
  ) {

    params.set(
      "location",
      location.trim()
    );
  }

  const response =
    await client.get<WeatherData>(
      `/weather?${params.toString()}`
    );

  return response.data;
}

// ============================================================
// ALL KARNATAKA MANDIS
// ============================================================

export async function getNearbyMandis(
  lat?: number,
  lng?: number,
  _radiusKm?: number,
  _crop?: string,
  location?: string,
  sortBy: "distance" | "rating" = "distance",
): Promise<MandiListResponse> {
  let latitude = lat;
  let longitude = lng;
  const placeName = location?.trim() || undefined;

  if (
    (latitude === undefined || longitude === undefined) &&
    !placeName
  ) {
    const gps = await getBrowserLocation();
    latitude = gps.latitude;
    longitude = gps.longitude;
  }

  const params = new URLSearchParams();

  if (
    latitude !== undefined &&
    longitude !== undefined &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {
    params.set("lat", String(latitude));
    params.set("lng", String(longitude));
  }

  if (placeName) {
    params.set("location", placeName);
  }

  params.set("sort_by", sortBy === "rating" ? "rating" : "distance");

  if (!params.has("lat") && !params.has("location")) {
    throw new Error("Provide GPS coordinates or a location name.");
  }

  const endpoint = `/mandis/nearby?${params.toString()}`;
  const response = await client.get<MandiListResponse>(endpoint, {
    timeout: 120000,
  });

  return response.data;
}

// ============================================================
// DASHBOARD DATA
// ============================================================

export async function getUserProfile(): Promise<DashboardProfile> {
  const response = await client.get<DashboardProfile>(
    "/history/profile"
  );
  return response.data;
}

export async function getEarnings(): Promise<EarningsResponse> {
  const response = await client.get<EarningsResponse>(
    "/history/earnings"
  );
  return response.data;
}

export async function getScanHistory(): Promise<ScanHistoryResponse> {
  const response = await client.get<ScanHistoryResponse>(
    "/history/scans"
  );
  return response.data;
}

export async function getPredictionHistory(): Promise<PredictionHistoryResponse> {
  const response = await client.get<PredictionHistoryResponse>(
    "/history/predictions"
  );
  return response.data;
}

// ============================================================
// MANDI STATUS
// ============================================================

export async function getMandiStatus(): Promise<MandiStatus> {

  const response =
    await client.get<MandiStatus>(
      "/mandis/status"
    );

  return response.data;
}

// ============================================================
// CROP PREDICTION
// ============================================================

export async function predictCrop(
  image: File
): Promise<CropPrediction> {

  if (!image) {
    throw new Error(
      "No image was provided."
    );
  }

  if (
    !image.type.startsWith(
      "image/"
    )
  ) {
    throw new Error(
      "Please upload a valid image."
    );
  }

  const formData =
    new FormData();

  formData.append(
    "file",
    image
  );

  console.log(
    "=========================================="
  );

  console.log(
    "[CROP] Sending image for prediction"
  );

  console.log(
    "[CROP] File:",
    image.name
  );

  console.log(
    "[CROP] Type:",
    image.type
  );

  console.log(
    "[CROP] Size:",
    image.size,
    "bytes"
  );

  console.log(
    "[CROP] Endpoint:",
    `${API_BASE_URL}/predict/crop`
  );

  console.log(
    "=========================================="
  );

  const response =
    await client.post<CropPrediction>(
      "/predict/crop",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },

        timeout: 120000,
      }
    );

  console.log(
    "[CROP] Prediction received:",
    response.data
  );

  return response.data;
}

// ============================================================
// GENERIC GET
// ============================================================

export async function get<
  T = unknown
>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {

  const response =
    await client.get<T>(
      url,
      config
    );

  return response.data;
}

// ============================================================
// GENERIC POST
// ============================================================

export async function post<
  T = unknown
>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {

  const response =
    await client.post<T>(
      url,
      data,
      config
    );

  return response.data;
}

// ============================================================
// API OBJECT
// ============================================================

export const api = {

  getWeather,

  getNearbyMandis,

  getMandiStatus,

  predictCrop,

  isAuthenticated,

  login,

  signup,

  logout,

  setToken,

  getCurrentUser,

  getUserProfile,

  getEarnings,

  getScanHistory,

  getPredictionHistory,

  getBrowserLocation,

  get,

  post,

  client,
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;