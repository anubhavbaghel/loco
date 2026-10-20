import type { Category } from "@/lib/events/categories";

export interface VibeItem {
  id: string;
  title: string;
  category: Category;
  image: string;
  location: string;
  city: string;
  priceMin: number | null;
  priceMax: number | null;
  isFree: boolean;
  description: string;
  organizer: string;
  rating: number;
  reviewsCount: number;
  dayOffset: number;
  hour: number;
  minute: number;
}

export const MOCK_VIBES: VibeItem[] = [
  {
    id: "sample-1",
    title: "Indie Nights Live at Kamani Auditorium",
    category: "Music",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    location: "Kamani Auditorium, Mandi House",
    city: "Delhi",
    priceMin: 799,
    priceMax: 2499,
    isFree: false,
    description:
      "An evening of indie and alt-rock with four homegrown Delhi bands, a stripped-back acoustic set and an after-show meet and greet in the courtyard.",
    organizer: "IndieVibes Live",
    rating: 4.9,
    reviewsCount: 320,
    dayOffset: 0,
    hour: 20,
    minute: 0,
  },
  {
    id: "sample-2",
    title: "Chandni Chowk Midnight Food Walk",
    category: "Food",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    location: "Chandni Chowk, Old Delhi",
    city: "Delhi",
    priceMin: 0,
    priceMax: null,
    isFree: true,
    description:
      "Walk the lanes of Old Delhi after dark with a local food historian — parathas, kebabs, kulfi and chai across eight legendary stalls.",
    organizer: "Old Delhi Walks",
    rating: 4.8,
    reviewsCount: 195,
    dayOffset: 0,
    hour: 22,
    minute: 30,
  },
  {
    id: "sample-3",
    title: "Techno Rooftop Sessions, Hauz Khas",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    location: "Hauz Khas Village, South Delhi",
    city: "Delhi",
    priceMin: 999,
    priceMax: 1499,
    isFree: false,
    description:
      "Melodic techno and deep house on a rooftop overlooking the Hauz Khas ruins, with guest DJs and a full cocktail menu.",
    organizer: "Pulse Events",
    rating: 4.7,
    reviewsCount: 140,
    dayOffset: 1,
    hour: 21,
    minute: 30,
  },
  {
    id: "sample-4",
    title: "Sunday Book Bazaar & Flea Market",
    category: "Markets",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    location: "Dilli Haat, INA",
    city: "Delhi",
    priceMin: 30,
    priceMax: null,
    isFree: false,
    description:
      "Second-hand books, handmade crafts, vintage posters and street food stalls from across India, all under the Dilli Haat canopy.",
    organizer: "Urban Collective",
    rating: 4.8,
    reviewsCount: 211,
    dayOffset: 2,
    hour: 11,
    minute: 0,
  },
  {
    id: "sample-5",
    title: "Open-Air Cinema at Sunder Nursery",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    location: "Sunder Nursery, Nizamuddin",
    city: "Delhi",
    priceMin: 450,
    priceMax: 700,
    isFree: false,
    description:
      "Bring a blanket for a classic film screening on the lawns, with wireless headphones, food trucks and the Mughal gardens lit up for the night.",
    organizer: "Sunset Cinema Club",
    rating: 4.8,
    reviewsCount: 210,
    dayOffset: 3,
    hour: 19,
    minute: 30,
  },
  {
    id: "sample-6",
    title: "Neon Canvas Art Jam, Shahpur Jat",
    category: "Art & Culture",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    location: "Studio 42, Shahpur Jat",
    city: "Delhi",
    priceMin: 1200,
    priceMax: null,
    isFree: false,
    description:
      "Paint under UV lights with neon acrylics while a live DJ spins, followed by a small exhibition of everything created on the night.",
    organizer: "ColorVerse Studio",
    rating: 4.6,
    reviewsCount: 76,
    dayOffset: 4,
    hour: 15,
    minute: 0,
  },
];
