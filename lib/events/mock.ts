import { MOCK_VIBES } from "@/lib/mockData";
import { categoryStyle } from "./categories";
import {
  formatEventDate,
  formatEventTime,
  formatPrice,
} from "./serialize";
import type { EventDTO } from "./types";

const DELHI = { lat: 28.6139, lng: 77.209 };

function schedule(dayOffset: number, hour: number, minute: number): Date {
  const start = new Date();
  start.setDate(start.getDate() + dayOffset);
  start.setHours(hour, minute, 0, 0);
  return start;
}

function spread(index: number): { lat: number; lng: number } {
  const angle = (index / MOCK_VIBES.length) * Math.PI * 2;
  const radius = 0.02 + (index % 3) * 0.02;
  return {
    lat: DELHI.lat + Math.sin(angle) * radius,
    lng: DELHI.lng + Math.cos(angle) * radius,
  };
}

export const MOCK_EVENT_DTOS: EventDTO[] = MOCK_VIBES.map((vibe, index) => {
  const style = categoryStyle(vibe.category);
  const coords = spread(index);
  const start = schedule(vibe.dayOffset, vibe.hour, vibe.minute);

  return {
    id: vibe.id,
    title: vibe.title,
    category: vibe.category,
    categoryBg: style.bg,
    categoryTextColor: style.text,
    image: vibe.image,
    date: formatEventDate(start),
    time: formatEventTime(start),
    startDate: start.toISOString(),
    endDate: null,
    location: `${vibe.location}, ${vibe.city}`,
    address: `${vibe.location}, ${vibe.city}`,
    city: vibe.city,
    lat: coords.lat,
    lng: coords.lng,
    distanceKm: null,
    price: formatPrice({
      priceMin: vibe.priceMin,
      priceMax: vibe.priceMax,
      isFree: vibe.isFree,
    }),
    priceMin: vibe.priceMin,
    priceMax: vibe.priceMax,
    currency: "INR",
    isFree: vibe.isFree,
    rating: vibe.rating,
    reviewsCount: vibe.reviewsCount,
    description: vibe.description,
    organizer: vibe.organizer,
    url: null,
    sourceName: "Sample data",
  };
});

export function withDistance(
  events: EventDTO[],
  center: { lat: number; lng: number } | null,
): EventDTO[] {
  if (!center) return events;
  return events.map((event) =>
    event.lat != null && event.lng != null
      ? {
          ...event,
          distanceKm:
            Math.round(
              haversine(center, { lat: event.lat, lng: event.lng }) * 10,
            ) / 10,
        }
      : event,
  );
}

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
