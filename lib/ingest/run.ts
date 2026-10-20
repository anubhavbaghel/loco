import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { classifyCategory, type Category } from "@/lib/events/categories";
import { allEventsAdapter } from "./adapters/allevents";
import { CITIES, resolveCity } from "./cities";
import { geocodeVenue } from "./geocode";
import type { CityConfig, IngestSummary, RawEvent, SourceAdapter } from "./types";

const ADAPTERS: SourceAdapter[] = [allEventsAdapter];
const GEOCODE_LIMIT_PER_CITY = 25;
const PAST_GRACE_MS = 12 * 60 * 60 * 1000;

function isPast(event: RawEvent): boolean {
  const reference = event.endDate ?? event.startDate;
  return reference.getTime() < Date.now() - PAST_GRACE_MS;
}

function isAllDay(date: Date): boolean {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0
  );
}

function buildDoc(event: RawEvent, city: CityConfig) {
  const haystack = [
    event.title,
    event.categoryRaw,
    event.description,
    event.venueName,
  ]
    .filter(Boolean)
    .join(" ");

  const category: Category = classifyCategory(haystack);
  const isFree = event.priceMin === 0;
  const hasCoords =
    typeof event.lat === "number" &&
    typeof event.lng === "number" &&
    Number.isFinite(event.lat) &&
    Number.isFinite(event.lng);

  return {
    title: event.title,
    category,
    categoryRaw: event.categoryRaw ?? null,
    image: event.image ?? null,
    startDate: event.startDate,
    endDate: event.endDate ?? null,
    allDay: isAllDay(event.startDate),
    venueName: event.venueName ?? null,
    address: event.address ?? null,
    city: city.city,
    ...(hasCoords
      ? { location: { type: "Point" as const, coordinates: [event.lng, event.lat] } }
      : {}),
    priceMin: event.priceMin ?? null,
    priceMax: event.priceMax ?? null,
    currency: event.currency ?? "INR",
    isFree,
    description: event.description ?? null,
    organizer: event.organizer ?? null,
    url: event.url,
    source: {
      name: event.sourceName,
      url: event.url,
      externalId: event.externalId ?? null,
    },
    status: event.status ?? "scheduled",
  };
}

async function ingestCity(
  city: CityConfig,
  log: (message: string) => void,
): Promise<IngestSummary[]> {
  const summaries: IngestSummary[] = [];

  for (const adapter of ADAPTERS) {
    const summary: IngestSummary = {
      city: city.name,
      adapter: adapter.name,
      fetched: 0,
      upserted: 0,
      skipped: 0,
      errors: [],
    };

    let raw: RawEvent[] = [];
    try {
      raw = await adapter.fetchCity(city);
      summary.fetched = raw.length;
      log(`[${city.name}] ${adapter.name}: fetched ${raw.length} events`);
    } catch (error) {
      summary.errors.push(error instanceof Error ? error.message : String(error));
      summaries.push(summary);
      continue;
    }

    let geocoded = 0;

    for (const event of raw) {
      if (isPast(event)) {
        summary.skipped += 1;
        continue;
      }

      if (
        (event.lat == null || event.lng == null) &&
        geocoded < GEOCODE_LIMIT_PER_CITY &&
        event.venueName
      ) {
        try {
          const coords = await geocodeVenue(event.venueName, city.city);
          if (coords) {
            event.lat = coords.lat;
            event.lng = coords.lng;
            geocoded += 1;
          }
        } catch {
          // Leave without coordinates; still ingest.
        }
      }

      const doc = buildDoc(event, city);
      try {
        await Event.updateOne(
          { "source.url": event.url },
          { $set: doc, $setOnInsert: { ingestedAt: new Date() } },
          { upsert: true },
        );
        summary.upserted += 1;
      } catch (error) {
        summary.errors.push(
          `${event.title}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    log(
      `[${city.name}] ${adapter.name}: upserted ${summary.upserted}, skipped ${summary.skipped}${geocoded ? `, geocoded ${geocoded}` : ""}`,
    );
    summaries.push(summary);
  }

  return summaries;
}

export async function runIngest(options?: {
  city?: string;
  log?: (message: string) => void;
}): Promise<IngestSummary[]> {
  const log = options?.log ?? (() => {});
  await dbConnect();

  const cities = options?.city ? [resolveCity(options.city)] : CITIES;

  // Purge legacy/mock documents that have no ingestion source.
  await Event.deleteMany({ "source.url": { $exists: false } });
  try {
    await Event.syncIndexes();
  } catch {
    // Index sync is best-effort; ingestion can proceed regardless.
  }

  const all: IngestSummary[] = [];
  for (const city of cities) {
    all.push(...(await ingestCity(city, log)));
  }
  return all;
}
