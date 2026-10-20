export const CATEGORIES = [
  "Music",
  "Nightlife",
  "Food",
  "Markets",
  "Art & Culture",
  "Outdoor",
  "Comedy",
  "Theatre",
  "Workshops",
  "Sports",
  "Festivals",
  "Events",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: Category = "Events";

export const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Music: { bg: "bg-purple-50", text: "text-purple-700" },
  Nightlife: { bg: "bg-indigo-50", text: "text-indigo-700" },
  Food: { bg: "bg-rose-50", text: "text-rose-700" },
  Markets: { bg: "bg-amber-50", text: "text-amber-700" },
  "Art & Culture": { bg: "bg-violet-50", text: "text-violet-700" },
  Outdoor: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Comedy: { bg: "bg-orange-50", text: "text-orange-700" },
  Theatre: { bg: "bg-fuchsia-50", text: "text-fuchsia-700" },
  Workshops: { bg: "bg-teal-50", text: "text-teal-700" },
  Sports: { bg: "bg-sky-50", text: "text-sky-700" },
  Festivals: { bg: "bg-pink-50", text: "text-pink-700" },
  Events: { bg: "bg-gray-100", text: "text-gray-700" },
};

const CATEGORY_RULES: Array<[Category, RegExp]> = [
  ["Comedy", /comedy|stand[- ]?up|open mic|improv|roast/i],
  [
    "Nightlife",
    /night ?life|club\b|\bdj\b|techno|house music|party|bar crawl|after ?party|pub ?crawl/i,
  ],
  [
    "Music",
    /concert|music|band\b|gig\b|dandiya|garba|qawwali|sufi|singing|orchestra|\brap\b|\bedm\b|\blive\b/i,
  ],
  [
    "Food",
    /food|brunch|dinner|tasting|culinary|cafe|restaurant|street food|buffet|brewery|biryani|kitchen/i,
  ],
  [
    "Markets",
    /market|flea|bazaar|bazar|mela\b|expo\b|\bfair\b|exhibition|pop[- ]?up shop/i,
  ],
  [
    "Art & Culture",
    /art\b|gallery|paint|pottery|culture|heritage|museum|photography|craft|literature|poetry|book\b/i,
  ],
  [
    "Theatre",
    /theatre|theater|\bplay\b|drama|stage|musical\b/i,
  ],
  [
    "Workshops",
    /workshop|masterclass|\bclass\b|bootcamp|training|seminar|webinar|session/i,
  ],
  [
    "Sports",
    /sports|marathon|\brun\b|match|tournament|cricket|football|badminton|yoga|fitness|trekking|trek\b/i,
  ],
  [
    "Festivals",
    /festival|\bfest\b|navratri|durga puja|diwali|holi|christmas|new year|celebrat/i,
  ],
  ["Outdoor", /outdoor|open air|\bpark\b|stargaz|hike|camping|picnic|garden/i],
];

export function classifyCategory(text: string): Category {
  const haystack = (text || "").toLowerCase();
  for (const [category, rule] of CATEGORY_RULES) {
    if (rule.test(haystack)) return category;
  }
  return DEFAULT_CATEGORY;
}

export function categoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES[DEFAULT_CATEGORY];
}
