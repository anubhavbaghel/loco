import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { serializeEvent } from "@/lib/events/serialize";
import { MOCK_EVENT_DTOS, withDistance } from "@/lib/events/mock";

type Coords = { lat: number; lng: number };

function parseCenter(url: string): Coords | null {
  const { searchParams } = new URL(url);
  const lat = Number.parseFloat(searchParams.get("lat") ?? "");
  const lng = Number.parseFloat(searchParams.get("lng") ?? "");
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const center = parseCenter(request.url);

  try {
    await dbConnect();
  } catch {
    const mock = MOCK_EVENT_DTOS.find((event) => event.id === id);
    return mock
      ? NextResponse.json(withDistance([mock], center)[0])
      : NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const isObjectId = /^[a-f\d]{24}$/i.test(id);
  const doc = await Event.findOne(
    isObjectId
      ? { _id: id }
      : { $or: [{ "source.externalId": id }, { url: id }] },
  ).lean();

  if (!doc) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(serializeEvent(doc, center));
}
