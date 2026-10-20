import type { CityConfig, RawEvent, SourceAdapter } from "../types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&#38;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
};

function decode(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replace(/&(amp|#38|quot|#39|apos|lt|gt|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function num(value: unknown): number | null {
  const n = typeof value === "string" ? Number.parseFloat(value) : (value as number);
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

function toDate(value: unknown): Date | null {
  if (!value || typeof value !== "string") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

type LdNode = Record<string, unknown>;

function isEvent(node: unknown): boolean {
  if (!node || typeof node !== "object") return false;
  const type = (node as LdNode)["@type"];
  const types = Array.isArray(type) ? type : [type];
  return types.some((t) => typeof t === "string" && /Event$/.test(t));
}

function collectEvents(node: unknown, out: LdNode[]): void {
  if (Array.isArray(node)) {
    for (const item of node) collectEvents(item, out);
    return;
  }
  if (!node || typeof node !== "object") return;
  const record = node as LdNode;

  if (isEvent(record)) {
    out.push(record);
    return;
  }
  if (Array.isArray(record.itemListElement)) {
    for (const el of record.itemListElement) {
      const item = (el as LdNode)?.item ?? el;
      collectEvents(item, out);
    }
  }
}

function extractLdJson(html: string): unknown[] {
  const blocks: unknown[] = [];
  const regex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      blocks.push(JSON.parse(raw));
    } catch {
      // Skip malformed blocks silently; other blocks may still parse.
    }
  }
  return blocks;
}

function splitVenue(name: string): { venue: string; address: string } {
  const cleaned = name.replace(/,\s*India\.?$/i, "").trim();
  const cut = cleaned.search(/[:：,]/);
  if (cleaned.length > 60 && cut > 0) {
    return {
      venue: cleaned.slice(0, cut).trim(),
      address: cleaned.slice(cut + 1).trim(),
    };
  }
  return { venue: cleaned, address: "" };
}

function toRaw(node: LdNode, city: CityConfig): RawEvent | null {
  const url = typeof node.url === "string" ? node.url : null;
  const title = decode(node.name as string);
  const startDate = toDate(node.startDate);
  if (!url || !title || !startDate) return null;

  const location = (node.location ?? {}) as LdNode;
  const address = (location.address ?? {}) as LdNode;
  const geo = (location.geo ?? {}) as LdNode;
  const offers = (node.offers ?? {}) as LdNode;
  const organizer = (node.organizer ?? {}) as LdNode;

  const statusUrl = typeof node.eventStatus === "string" ? node.eventStatus : "";
  const status = /Cancelled/i.test(statusUrl)
    ? "cancelled"
    : /Postponed/i.test(statusUrl)
      ? "postponed"
      : "scheduled";

  const lowPrice = num(offers.lowPrice) ?? num(offers.price);
  const highPrice = num(offers.highPrice) ?? num(offers.price);

  const street = decode(address.streetAddress as string);
  const locality = decode(address.addressLocality as string);
  const parsed = splitVenue(decode(location.name as string));

  const externalId = url.split("/").filter(Boolean).pop() ?? null;

  return {
    title,
    categoryRaw: [title, node.description, street].filter(Boolean).join(" "),
    image: typeof node.image === "string" ? node.image : null,
    startDate,
    endDate: toDate(node.endDate),
    venueName: parsed.venue || street || null,
    address: street || locality || parsed.address || null,
    city: city.city,
    lat: num(geo.latitude),
    lng: num(geo.longitude),
    description: decode(node.description as string) || null,
    organizer: decode(organizer.name as string) || null,
    priceMin: lowPrice,
    priceMax: highPrice,
    currency: (offers.priceCurrency as string) ?? "INR",
    url,
    sourceName: "AllEvents.in",
    externalId,
    status,
  };
}

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const allEventsAdapter: SourceAdapter = {
  name: "allevents",

  async fetchCity(city) {
    const byUrl = new Map<string, RawEvent>();

    for (const slug of city.allEventsSlugs) {
      const pageUrl = `https://allevents.in/${slug}/events`;
      let html: string;
      try {
        html = await fetchHtml(pageUrl);
      } catch {
        continue;
      }

      const nodes: LdNode[] = [];
      for (const block of extractLdJson(html)) collectEvents(block, nodes);

      for (const node of nodes) {
        const raw = toRaw(node, city);
        if (raw && !byUrl.has(raw.url)) byUrl.set(raw.url, raw);
      }

      await sleep(900);
    }

    return [...byUrl.values()];
  },
};
