import { categoryStyle } from "./categories";
import type { EventDTO } from "./types";

type Coords = { lat: number; lng: number };

const IST = "Asia/Kolkata";

export function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

export function formatEventDate(start: Date, end?: Date | null): string {
  const fmt = (d: Date, withYear: boolean) =>
    new Intl.DateTimeFormat("en-IN", {
      timeZone: IST,
      weekday: "short",
      day: "numeric",
      month: "short",
      ...(withYear ? { year: "numeric" } : {}),
    }).format(d);

  if (end && Math.abs(end.getTime() - start.getTime()) > 20 * 60 * 60 * 1000) {
    return `${fmt(start, false)} – ${fmt(end, false)}`;
  }
  return fmt(start, false);
}

export function formatEventTime(start: Date, allDay = false): string {
  if (allDay) return "All day";
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(start)
    .replace(/\s?(am|pm)/i, (m) => m.toUpperCase().trim());
}

export function formatPrice(input: {
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string | null;
  isFree?: boolean;
}): string {
  const { priceMin, priceMax, isFree } = input;
  if (isFree || (priceMin === 0 && (priceMax == null || priceMax === 0))) {
    return "Free entry";
  }
  const symbol = "\u20b9";
  if (priceMin == null && priceMax == null) return "See details";
  if (priceMin != null && priceMax != null && priceMax > priceMin) {
    return `${symbol}${priceMin} – ${symbol}${priceMax}`;
  }
  const value = priceMin ?? priceMax ?? 0;
  return `${symbol}${value} onwards`;
}

function isAllDay(start: Date): boolean {
  return (
    start.getUTCHours() === 0 &&
    start.getUTCMinutes() === 0 &&
    start.getUTCSeconds() === 0
  );
}

type SerializableEvent = {
  _id?: unknown;
  id?: string;
  title?: string;
  category?: string;
  image?: string | null;
  startDate?: Date | string;
  endDate?: Date | string | null;
  allDay?: boolean;
  venueName?: string | null;
  address?: string | null;
  city?: string | null;
  location?: { coordinates?: number[] } | null;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string | null;
  isFree?: boolean;
  description?: string | null;
  organizer?: string | null;
  rating?: number | null;
  reviewsCount?: number | null;
  url?: string | null;
  source?: { name?: string | null; url?: string | null } | null;
};

export function serializeEvent(doc: SerializableEvent, center?: Coords | null): EventDTO {
  const start = doc.startDate ? new Date(doc.startDate) : new Date();
  const end = doc.endDate ? new Date(doc.endDate) : null;
  const allDay = doc.allDay ?? isAllDay(start);

  const style = categoryStyle(doc.category ?? "Events");

  const coords = doc.location?.coordinates;
  const lng = Array.isArray(coords) ? coords[0] : null;
  const lat = Array.isArray(coords) ? coords[1] : null;

  const distanceKm =
    center && lat != null && lng != null
      ? haversineKm(center, { lat, lng })
      : null;

  const venueName = doc.venueName?.trim() ?? "";
  const address = doc.address?.trim() ?? "";
  const city = doc.city?.trim() ?? "";

  const dedupe = (parts: string[]) =>
    parts.filter((part, index) => {
      const value = part.toLowerCase();
      return parts.findIndex((other) => other.toLowerCase() === value) === index;
    });

  const locationParts = dedupe([venueName, address, city].filter(Boolean));
  const venueHasCity =
    city.length > 0 && venueName.toLowerCase().includes(city.toLowerCase());
  const primaryLocation = dedupe(
    (venueHasCity || !city ? [venueName] : [venueName, city]).filter(Boolean),
  ).join(", ");

  return {
    id: doc.id ?? String(doc._id ?? ""),
    title: doc.title ?? "Untitled event",
    category: doc.category ?? "Events",
    categoryBg: style.bg,
    categoryTextColor: style.text,
    image: doc.image ?? null,
    date: formatEventDate(start, end),
    time: formatEventTime(start, allDay),
    startDate: start.toISOString(),
    endDate: end ? end.toISOString() : null,
    location:
      primaryLocation || locationParts.join(", ") || "Location TBA",
    address: locationParts.join(", "),
    city: doc.city ?? "",
    lat: lat ?? null,
    lng: lng ?? null,
    distanceKm,
    price: formatPrice({
      priceMin: doc.priceMin,
      priceMax: doc.priceMax,
      isFree: doc.isFree,
    }),
    priceMin: doc.priceMin ?? null,
    priceMax: doc.priceMax ?? null,
    currency: doc.currency ?? "INR",
    isFree: Boolean(doc.isFree),
    rating: doc.rating ?? null,
    reviewsCount: doc.reviewsCount ?? null,
    description: doc.description ?? "",
    organizer: doc.organizer ?? "Listed on Loco",
    url: doc.url ?? doc.source?.url ?? null,
    sourceName: doc.source?.name ?? null,
  };
}

export function formatDistanceKm(km: number | null | undefined): string | null {
  if (km == null) return null;
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  return `${km.toFixed(1)} km away`;
}
