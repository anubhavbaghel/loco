import type { CityConfig } from "./types";

export const CITIES: CityConfig[] = [
  {
    name: "Delhi NCR",
    city: "Delhi",
    center: { lat: 28.6139, lng: 77.209 },
    allEventsSlugs: ["delhi", "new-delhi", "noida", "gurgaon", "faridabad"],
    aliases: [
      "delhi",
      "new delhi",
      "new-delhi",
      "ncr",
      "noida",
      "greater noida",
      "gurgaon",
      "gurugram",
      "faridabad",
      "ghaziabad",
    ],
  },
];

export function resolveCity(input?: string): CityConfig {
  if (!input) return CITIES[0];
  const needle = input.toLowerCase();
  return (
    CITIES.find(
      (city) =>
        city.city.toLowerCase() === needle ||
        city.name.toLowerCase() === needle ||
        city.aliases.includes(needle),
    ) ?? CITIES[0]
  );
}
