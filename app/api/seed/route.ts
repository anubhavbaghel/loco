import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { MOCK_VIBES } from "@/lib/mockData";

export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing collection and insert curated city events
    await Event.deleteMany({});
    const seededEvents = await Event.insertMany(MOCK_VIBES);

    return NextResponse.json({
      message: "Database seeded successfully with real city vibes!",
      count: seededEvents.length,
      events: seededEvents,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
