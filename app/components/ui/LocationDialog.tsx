"use client";

import { useEffect, useState } from "react";
import { Loader2, LocateFixed, MapPin, Search, X } from "lucide-react";
import { useLocationStore } from "@/app/store/globalStore";
import type { GeocodeResult } from "@/lib/events/types";

const RADIUS_OPTIONS = [2, 5, 10, 25, 50];
const KNOWN_CITIES: Array<[RegExp, string]> = [
  [/gurugram|gurgaon/i, "Gurgaon"],
  [/noida/i, "Noida"],
  [/faridabad/i, "Faridabad"],
  [/ghaziabad/i, "Ghaziabad"],
  [/new delhi|\bdelhi\b/i, "Delhi"],
  [/bengaluru|bangalore/i, "Bengaluru"],
  [/mumbai|bombay/i, "Mumbai"],
  [/pune/i, "Pune"],
  [/goa/i, "Goa"],
];

function shortLabel(label: string): string {
  return label.split(",").slice(0, 2).join(",").trim();
}

function extractCity(label: string, fallback: string): string {
  for (const [rx, city] of KNOWN_CITIES) {
    if (rx.test(label)) return city;
  }
  return fallback;
}

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LocationDialog({ open, onClose }: LocationDialogProps) {
  const setLocation = useLocationStore((state) => state.setLocation);
  const radiusKm = useLocationStore((state) => state.radiusKm);
  const setRadius = useLocationStore((state) => state.setRadius);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const trimmedQuery = query.trim();
  const visibleResults = trimmedQuery.length >= 3 ? results : [];

  useEffect(() => {
    const query = trimmedQuery;
    if (query.length < 3) return;
    const id = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(id);
  }, [trimmedQuery]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported in this browser.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        let label = "Current location";
        let city = useLocationStore.getState().city;
        try {
          const res = await fetch(
            `/api/geocode?lat=${coords.lat}&lng=${coords.lng}`,
          );
          const data = await res.json();
          const first: GeocodeResult | undefined = data.results?.[0];
          if (first) {
            label = shortLabel(first.label);
            city = extractCity(first.label, city);
          }
        } catch {
          // Keep the generic label.
        }
        setLocation({ coords, label, city, source: "gps" });
        setLocating(false);
        onClose();
      },
      (error) => {
        setLocating(false);
        setGeoError(error.message || "Could not get your location.");
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  };

  const pick = (result: GeocodeResult) => {
    setLocation({
      coords: { lat: result.lat, lng: result.lng },
      label: shortLabel(result.label),
      city: extractCity(result.label, useLocationStore.getState().city),
      source: "search",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose location"
        className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Choose your location</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <button
            onClick={useMyLocation}
            disabled={locating}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {locating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="h-4 w-4" />
            )}
            {locating ? "Getting location…" : "Use my current location"}
          </button>

          {geoError && <p className="text-xs text-rose-600">{geoError}</p>}

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-100" />
            or search
            <span className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 transition-colors focus-within:border-accent">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search an area, e.g. ITO, Delhi"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {searching && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
          </div>

          {visibleResults.length > 0 && (
            <ul className="max-h-56 divide-y divide-gray-100 overflow-y-auto rounded-lg border border-gray-100">
              {visibleResults.map((result, index) => (
                <li key={`${result.lat}-${result.lng}-${index}`}>
                  <button
                    onClick={() => pick(result)}
                    className="flex w-full items-start gap-2 px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <span className="text-xs text-gray-700">{result.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div>
            <p className="mb-2 text-xs font-medium text-gray-700">Search radius</p>
            <div className="flex flex-wrap gap-2">
              {RADIUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setRadius(option)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    radiusKm === option
                      ? "border-accent bg-accent text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {option} km
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
