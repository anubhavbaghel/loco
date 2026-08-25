import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { MOCK_VIBES } from "@/lib/mockData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const category = searchParams.get("category");

    await dbConnect();

    const query: Record<string, unknown> = {};
    if (city) query.city = new RegExp(city, "i");
    if (category) query.category = new RegExp(category, "i");

    const events = await Event.find(query);

    if (!events || events.length === 0) {
      return NextResponse.json(MOCK_VIBES);
    }

    return NextResponse.json(events);
  } catch {
    // Graceful fallback to mock vibes if DB connection fails
    return NextResponse.json(MOCK_VIBES);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newEvent = await Event.create({
      title: body.title,
      category: body.category || "Events",
      categoryBg: body.categoryBg || "bg-violet-100",
      categoryTextColor: body.categoryTextColor || "text-violet-700",
      image: body.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      date: body.date || "Upcoming",
      time: body.time || "7:00 PM",
      location: body.location || "Bengaluru",
      city: body.city || "Bengaluru",
      price: body.price || "Free Entry",
      rating: body.rating || 4.8,
      reviewsCount: body.reviewsCount || 1,
      description: body.description || "A exciting local vibe in the city.",
      organizer: body.organizer || "Urban Vibe Collective",
      isPopular: body.isPopular ?? true,
      isTrending: body.isTrending ?? false,
      isHappeningToday: body.isHappeningToday ?? false,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}