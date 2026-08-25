export interface VibeItem {
  id: string;
  title: string;
  category: "Events" | "Places" | "Markets" | "Food" | "Music" | "Outdoor" | "Nightlife" | "Art-Culture";
  categoryBg: string;
  categoryTextColor: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: string;
  rating: number;
  reviewsCount: number;
  description: string;
  organizer: string;
  isPopular?: boolean;
  isTrending?: boolean;
  isHappeningToday?: boolean;
}

export const MOCK_VIBES: VibeItem[] = [
  {
    id: "vibe-1",
    title: "The Local Train - Live in Bengaluru",
    category: "Music",
    categoryBg: "bg-purple-100",
    categoryTextColor: "text-purple-700",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    date: "24 May 2026",
    time: "7:00 PM",
    location: "Phoenix Marketcity, Whitefield",
    city: "Bengaluru",
    price: "₹799 onwards",
    rating: 4.9,
    reviewsCount: 320,
    description: "Experience an electrifying indie rock night with The Local Train live in concert. Unmatched energy, sing-along anthems, and open-air concert vibes under the stars!",
    organizer: "IndieVibes Live",
    isPopular: true,
    isTrending: true,
    isHappeningToday: true,
  },
  {
    id: "vibe-2",
    title: "Indiranagar Midnight Flea & Food Fest",
    category: "Markets",
    categoryBg: "bg-amber-100",
    categoryTextColor: "text-amber-700",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    date: "25 May 2026",
    time: "4:00 PM - 12:00 AM",
    location: "100ft Road, Indiranagar",
    city: "Bengaluru",
    price: "Free Entry",
    rating: 4.8,
    reviewsCount: 195,
    description: "Discover handcrafted artisan goods, vintage streetwear, live acoustic buskers, and over 40 gourmet food pop-ups in the heart of Indiranagar.",
    organizer: "Urban Collective",
    isPopular: true,
    isHappeningToday: true,
  },
  {
    id: "vibe-3",
    title: "Techno & Sunset Sessions @ Mirage",
    category: "Nightlife",
    categoryBg: "bg-pink-100",
    categoryTextColor: "text-pink-700",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    date: "26 May 2026",
    time: "5:30 PM",
    location: "Mirage Rooftop, Koramangala",
    city: "Bengaluru",
    price: "₹999",
    rating: 4.7,
    reviewsCount: 140,
    description: "Deep house & melodic techno paired with panoramic rooftop sunset views. Craft cocktails, immersive laser aesthetics, and guest international DJs.",
    organizer: "Pulse Events",
    isTrending: true,
  },
  {
    id: "vibe-4",
    title: "Artisanal Ramen & Sake Pop-up",
    category: "Food",
    categoryBg: "bg-rose-100",
    categoryTextColor: "text-rose-700",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    date: "27 May 2026",
    time: "1:00 PM & 8:00 PM",
    location: "The Garden Table, Lavelle Road",
    city: "Bengaluru",
    price: "₹1,499",
    rating: 4.9,
    reviewsCount: 88,
    description: "A 5-course hand-pulled ramen tasting menu curated by Chef Tanaka, paired with premium Japanese sakes and match-inspired desserts.",
    organizer: "Umami Social",
    isPopular: true,
  },
  {
    id: "vibe-5",
    title: "Open Air Cinema: Classic Movie Under Stars",
    category: "Outdoor",
    categoryBg: "bg-emerald-100",
    categoryTextColor: "text-emerald-700",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    date: "28 May 2026",
    time: "7:30 PM",
    location: "Cubbon Park Amphitheatre",
    city: "Bengaluru",
    price: "₹450",
    rating: 4.8,
    reviewsCount: 210,
    description: "Cozy up on beanbags under the night sky with headphones provided for a silent cinema experience. Gourmet popcorn and hot cocoa included!",
    organizer: "Sunset Cinema Club",
    isTrending: true,
  },
  {
    id: "vibe-6",
    title: "Neon Painting & Wine Workshop",
    category: "Art-Culture",
    categoryBg: "bg-indigo-100",
    categoryTextColor: "text-indigo-700",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    date: "29 May 2026",
    time: "3:00 PM",
    location: "Studio 42, HSR Layout",
    city: "Bengaluru",
    price: "₹1,200",
    rating: 4.6,
    reviewsCount: 76,
    description: "Unleash your creativity under UV blacklights using glowing neon paints while sipping curated wines. All painting materials provided!",
    organizer: "ColorVerse Studio",
    isPopular: false,
  },
];

export const MOCK_CATEGORIES = [
  { id: 1, item: "Events", link: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80", alt: "Events", bg: "bg-blue-50 border-blue-200 text-blue-600" },
  { id: 2, item: "Places", link: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=200&q=80", alt: "Places", bg: "bg-emerald-50 border-emerald-200 text-emerald-600" },
  { id: 3, item: "Markets", link: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=200&q=80", alt: "Markets", bg: "bg-amber-50 border-amber-200 text-amber-600" },
  { id: 4, item: "Food", link: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80", alt: "Food", bg: "bg-rose-50 border-rose-200 text-rose-600" },
  { id: 5, item: "Music", link: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80", alt: "Music", bg: "bg-purple-50 border-purple-200 text-purple-600" },
  { id: 6, item: "Outdoor", link: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80", alt: "Outdoor", bg: "bg-teal-50 border-teal-200 text-teal-600" },
  { id: 7, item: "Nightlife", link: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=200&q=80", alt: "Nightlife", bg: "bg-pink-50 border-pink-200 text-pink-600" },
  { id: 8, item: "Art-Culture", link: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=200&q=80", alt: "Art-Culture", bg: "bg-indigo-50 border-indigo-200 text-indigo-600" },
];
