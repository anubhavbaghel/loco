export interface EventDTO {
  id: string;
  title: string;
  category: string;
  categoryBg: string;
  categoryTextColor: string;
  image: string | null;
  date: string;
  time: string;
  startDate: string;
  endDate: string | null;
  location: string;
  address: string;
  city: string;
  lat: number | null;
  lng: number | null;
  distanceKm: number | null;
  price: string;
  priceMin: number | null;
  priceMax: number | null;
  currency: string;
  isFree: boolean;
  rating: number | null;
  reviewsCount: number | null;
  description: string;
  organizer: string;
  url: string | null;
  sourceName: string | null;
}

export interface EventsResponse {
  events: EventDTO[];
  total: number;
  degraded: boolean;
  center: { lat: number; lng: number } | null;
}

export interface GeocodeResult {
  label: string;
  lat: number;
  lng: number;
  type: string | null;
}
