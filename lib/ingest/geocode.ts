import type { GeocodeResult } from "@/lib/events/types";

const UA = "loco-events/1.0 (https://github.com/anomalyco/opencode)";
const NOMINATIM = "https://nominatim.openstreetmap.org";
const MIN_INTERVAL_MS = 1100;

let lastCallAt = 0;

async function throttle(): Promise<void> {
  const wait = MIN_INTERVAL_MS - (Date.now() - lastCallAt);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCallAt = Date.now();
}

type CacheEntry = { value: unknown; expires: number };
const cache = new Map<string, CacheEntry>();
const TTL_MS = 24 * 60 * 60 * 1000;

function getCache<T>(key: string): T | undefined {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  return undefined;
}

function setCache(key: string, value: unknown): void {
  cache.set(key, { value, expires: Date.now() + TTL_MS });
}

async function nominatim<T>(path: string): Promise<T | null> {
  await throttle();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch(`${NOMINATIM}${path}`, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

type NominatimItem = {
  lat: string;
  lon: string;
  display_name: string;
  type?: string;
  class?: string;
  address?: Record<string, string>;
};

function toResult(item: NominatimItem): GeocodeResult {
  return {
    label: item.display_name,
    lat: Number.parseFloat(item.lat),
    lng: Number.parseFloat(item.lon),
    type: item.type ?? item.class ?? null,
  };
}

export async function searchPlaces(query: string): Promise<GeocodeResult[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  const key = `search:${q.toLowerCase()}`;
  const cached = getCache<GeocodeResult[]>(key);
  if (cached) return cached;

  const data = await nominatim<NominatimItem[]>(
    `/search?q=${encodeURIComponent(q)}&format=jsonv2&limit=6&addressdetails=1&countrycodes=in`,
  );
  const results = (data ?? [])
    .map(toResult)
    .filter((r) => Number.isFinite(r.lat) && Number.isFinite(r.lng));
  setCache(key, results);
  return results;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<GeocodeResult | null> {
  const key = `reverse:${lat.toFixed(4)},${lng.toFixed(4)}`;
  const cached = getCache<GeocodeResult>(key);
  if (cached) return cached;

  const data = await nominatim<NominatimItem & { error?: string }>(
    `/reverse?lat=${lat}&lon=${lng}&format=jsonv2&zoom=14&addressdetails=1`,
  );
  if (!data || data.error || !data.display_name) return null;
  const result = toResult(data);
  setCache(key, result);
  return result;
}

export async function geocodeVenue(
  venue: string,
  city: string,
): Promise<{ lat: number; lng: number } | null> {
  const query = `${venue}, ${city}, India`;
  const results = await searchPlaces(query);
  if (results.length > 0) return { lat: results[0].lat, lng: results[0].lng };
  const fallback = await searchPlaces(`${city}, India`);
  return fallback.length > 0
    ? { lat: fallback[0].lat, lng: fallback[0].lng }
    : null;
}
