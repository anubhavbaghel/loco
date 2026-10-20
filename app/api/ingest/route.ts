import { NextResponse } from "next/server";
import { runIngest } from "@/lib/ingest/run";

export const maxDuration = 300;

async function handle(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const provided =
      request.headers.get("x-cron-secret") ??
      new URL(request.url).searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? undefined;

  try {
    const summaries = await runIngest({ city });
    const upserted = summaries.reduce((sum, s) => sum + s.upserted, 0);
    return NextResponse.json({ ok: true, upserted, summaries });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ingest failed" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  return handle(request);
}

export async function GET(request: Request) {
  return handle(request);
}
