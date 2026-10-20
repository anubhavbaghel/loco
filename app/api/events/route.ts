import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { serializeEvent } from "@/lib/events/serialize";
import { MOCK_EVENT_DTOS, withDistance } from "@/lib/events/mock";
import type { EventsResponse } from "@/lib/events/types";

type Coords = { lat: number; lng: number };

function parseCenter(searchParams: URLSearchParams): Coords | null {
  const lat = Number.parseFloat(searchParams.get("lat") ?? "");
  const lng = Number.parseFloat(searchParams.get("lng") ?? "");
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const MAX_LIMIT = 200;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const center = parseCenter(searchParams);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const city = searchParams.get("city")?.trim();
  const ids = searchParams.get("ids")?.trim();
  const free = searchParams.get("free") === "true";
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const sort = searchParams.get("sort");
  const radiusKm = Math.min(
    Math.max(Number.parseFloat(searchParams.get("radiusKm") ?? "") || 15, 0.5),
    200,
  );
  const limit = Math.min(
    Math.max(Number.parseInt(searchParams.get("limit") ?? "", 10) || 60, 1),
    MAX_LIMIT,
  );

  const respond = (events: EventsResponse["events"], degraded: boolean) =>
    NextResponse.json({
      events,
      total: events.length,
      degraded,
      center,
    } satisfies EventsResponse);

  try {
    await dbConnect();
  } catch (error) {
    console.error(
      "[api/events] database unavailable, serving sample data:",
      error instanceof Error ? error.message : error,
    );
    const query = q?.toLowerCase();
    const idList = ids ? ids.split(",") : null;
    const categoryList = category ? category.split(",") : null;

    let list = MOCK_EVENT_DTOS.filter((event) => {
      if (idList) return idList.includes(event.id);
      if (categoryList && !categoryList.includes(event.category)) return false;
      if (free && !event.isFree) return false;
      if (query) {
        const haystack =
          `${event.title} ${event.location} ${event.category} ${event.description}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    list = withDistance(list, center);
    list.sort((a, b) =>
      center
        ? (a.distanceKm ?? Number.POSITIVE_INFINITY) -
          (b.distanceKm ?? Number.POSITIVE_INFINITY)
        : a.startDate.localeCompare(b.startDate),
    );

    return respond(list.slice(0, limit), true);
  }

  // Direct lookup by id (used by the Saved page).
  if (ids) {
    const list = ids.split(",").filter(Boolean);
    if (list.length === 0) return respond([], false);
    const objectIds = list.filter((id) => /^[a-f\d]{24}$/i.test(id));
    const docs = await Event.find({
      $or: [
        ...(objectIds.length ? [{ _id: { $in: objectIds } }] : []),
        { "source.externalId": { $in: list } },
      ],
    }).lean();
    return respond(
      docs.map((doc) => serializeEvent(doc, center)),
      false,
    );
  }

  const filter: Record<string, unknown> = {};
  const and: Record<string, unknown>[] = [];
  if (category) filter.category = { $in: category.split(",") };
  if (city) filter.city = new RegExp(`^${escapeRegex(city)}$`, "i");
  if (free) filter.isFree = true;
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    and.push({
      $or: [{ title: rx }, { venueName: rx }, { description: rx }, { category: rx }],
    });
  }
  if (dateFrom || dateTo) {
    const range: Record<string, Date> = {};
    if (dateFrom) range.$gte = new Date(dateFrom);
    if (dateTo) range.$lte = new Date(dateTo);
    and.push({ startDate: range });
  } else {
    const now = new Date();
    and.push({ $or: [{ startDate: { $gte: now } }, { endDate: { $gte: now } }] });
  }
  if (and.length) filter.$and = and;

  let docs: Array<Record<string, unknown>> = [];

  if (center) {
    docs = await Event.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [center.lng, center.lat] },
          distanceField: "distanceMeters",
          maxDistance: radiusKm * 1000,
          spherical: true,
          query: filter,
        },
      },
      { $sort: sort === "date" ? { startDate: 1 } : { distanceMeters: 1 } },
      { $limit: limit },
    ]);
  } else {
    const sortSpec: Record<string, 1 | -1> =
      sort === "price" ? { priceMin: 1 } : sort === "rating" ? { rating: -1 } : { startDate: 1 };
    docs = await Event.find(filter).sort(sortSpec).limit(limit).lean();
  }

  return respond(
    docs.map((doc) => serializeEvent(doc, center)),
    false,
  );
}
