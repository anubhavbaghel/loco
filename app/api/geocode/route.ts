import { NextResponse } from "next/server";
import { reverseGeocode, searchPlaces } from "@/lib/ingest/geocode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const lat = Number.parseFloat(searchParams.get("lat") ?? "");
  const lng = Number.parseFloat(searchParams.get("lng") ?? "");

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    const result = await reverseGeocode(lat, lng);
    return NextResponse.json({ results: result ? [result] : [] });
  }

  if (!q || q.trim().length < 3) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchPlaces(q);
  return NextResponse.json({ results });
}
