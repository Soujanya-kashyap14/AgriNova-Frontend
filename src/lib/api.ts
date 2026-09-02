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
}

export interface MandiStatus {
  database_exists: boolean;

  database_path: string;

  total_markets: number;

  markets_with_coordinates: number;

  markets_without_coordinates: number;
}

// ============================================================
// AUTH
// ============================================================

export function isAuthenticated(): boolean {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  const token =
    localStorage.getItem(
      "token"
    ) ||
    localStorage.getItem(
      "access_token"
    );

  return Boolean(token);
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
    localStorage.getItem(
      "token"
    ) ||
    localStorage.getItem(
      "access_token"
    )
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
  lng?: number
): Promise<MandiListResponse> {

  let latitude =
    lat;

  let longitude =
    lng;

  // ----------------------------------------------------------
  // Get real browser GPS when coordinates aren't supplied.
  // ----------------------------------------------------------

  if (
    latitude === undefined ||
    longitude === undefined ||
    latitude === null ||
    longitude === null
  ) {

    const location =
      await getBrowserLocation();

    latitude =
      location.latitude;

    longitude =
      location.longitude;
  }

  // ----------------------------------------------------------
  // Validate coordinates.
  // ----------------------------------------------------------

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

  if (
    latitude < -90 ||
    latitude > 90
  ) {

    throw new Error(
      "Invalid latitude."
    );
  }

  if (
    longitude < -180 ||
    longitude > 180
  ) {

    throw new Error(
      "Invalid longitude."
    );
  }

  // ----------------------------------------------------------
  // IMPORTANT:
  //
  // There is intentionally NO:
  //
  // radius
  // limit
  //
  // query parameter.
  // ----------------------------------------------------------

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

  const endpoint =
    `/mandis/nearby?${params.toString()}`;

  console.log(
    "=========================================="
  );

  console.log(
    "[MANDI] Searching ALL Karnataka tomato mandis"
  );

  console.log(
    "[MANDI] Latitude:",
    latitude
  );

  console.log(
    "[MANDI] Longitude:",
    longitude
  );

  console.log(
    "[MANDI] Radius: NONE"
  );

  console.log(
    "[MANDI] Limit: NONE"
  );

  console.log(
    "[MANDI] Sorting: nearest -> farthest"
  );

  console.log(
    "[MANDI] Endpoint:",
    `${API_BASE_URL}${endpoint}`
  );

  console.log(
    "=========================================="
  );

  const response =
    await client.get<MandiListResponse>(
      endpoint,
      {
        timeout: 120000,
      }
    );

  console.log(
    "[MANDI] Total Karnataka mandis:",
    response.data.mandi_count
  );

  console.log(
    "[MANDI] Response:",
    response.data
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

  getBrowserLocation,

  get,

  post,

  client,
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;