export interface RawEvent {
  title: string;
  categoryRaw?: string | null;
  image?: string | null;
  startDate: Date;
  endDate?: Date | null;
  venueName?: string | null;
  address?: string | null;
  city: string;
  lat?: number | null;
  lng?: number | null;
  description?: string | null;
  organizer?: string | null;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string | null;
  url: string;
  sourceName: string;
  externalId?: string | null;
  status?: "scheduled" | "cancelled" | "postponed";
}

export interface CityConfig {
  name: string;
  city: string;
  center: { lat: number; lng: number };
  allEventsSlugs: string[];
  aliases: string[];
}

export interface SourceAdapter {
  name: string;
  fetchCity(city: CityConfig): Promise<RawEvent[]>;
}

export interface IngestSummary {
  city: string;
  adapter: string;
  fetched: number;
  upserted: number;
  skipped: number;
  errors: string[];
}
