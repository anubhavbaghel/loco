"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/app/components/ui/Header";
import EventsCard from "@/app/components/ui/EventsCard";
import { EventCardSkeleton } from "@/app/components/ui/Skeletons";
import { useEvents } from "@/lib/useEvents";
import { useLocationStore } from "@/app/store/globalStore";
import { isToday, isWeekend, isUpcoming, withinDays } from "@/lib/events/dates";
import { Loader2, Map, LayoutGrid, Search, SearchX } from "lucide-react";

const EventsMap = dynamic(() => import("@/app/components/ui/EventsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white text-sm text-gray-500">
      Loading map…
    </div>
  ),
});

const FILTERS = ["All", "Today", "This weekend", "Free", "This week"] as const;
const DELHI_CENTER = { lat: 28.6139, lng: 77.209 };

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const coords = useLocationStore((state) => state.coords);
  const label = useLocationStore((state) => state.label);

  const { events, loading, degraded } = useEvents({
    q: searchQuery.trim() || undefined,
    limit: 150,
  });

  const filtered = useMemo(() => {
    return events.filter((event) => {
      switch (activeFilter) {
        case "Today":
          return isToday(event.startDate);
        case "This weekend":
          return isWeekend(event.startDate) && isUpcoming(event.startDate);
        case "Free":
          return event.isFree;
        case "This week":
          return isUpcoming(event.startDate) && withinDays(event.startDate, 7);
        default:
          return true;
      }
    });
  }, [events, activeFilter]);

  const mapCenter = coords ?? { lat: events[0]?.lat ?? DELHI_CENTER.lat, lng: events[0]?.lng ?? DELHI_CENTER.lng };

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-gray-50 pb-24 md:pb-10">
      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pt-4 md:px-8">
        <section className="flex items-end justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              Explore
            </h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-500">
              {label ? `Around ${label}` : "Across the city"}
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "grid" ? "bg-accent-soft text-accent" : "text-gray-500 hover:text-gray-900"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "map" ? "bg-accent-soft text-accent" : "text-gray-500 hover:text-gray-900"
              }`}
              aria-label="Map view"
            >
              <Map className="h-4 w-4" />
            </button>
          </div>
        </section>

        {degraded && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Showing sample data — connect a database and run the ingest for live events.
          </p>
        )}

        <section>
          <div className="flex max-w-2xl items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 transition-colors focus-within:border-accent">
            <Search className="ml-1 h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by venue, category or keyword"
              aria-label="Search events"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </section>

        <section className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {FILTERS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`shrink-0 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === chip
                  ? "border-accent bg-accent text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {chip}
            </button>
          ))}
          <span className="ml-auto hidden shrink-0 self-center text-xs text-gray-500 md:inline">
            {filtered.length} event{filtered.length === 1 ? "" : "s"}
          </span>
        </section>

        <main className="py-2">
          {viewMode === "grid" ? (
            loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
                <SearchX className="h-8 w-8 text-gray-300" />
                <h3 className="text-sm font-semibold text-gray-900">No events found</h3>
                <p className="max-w-xs text-xs text-gray-500">
                  Try a different search term, widen your radius, or clear the filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((event) => (
                  <EventsCard key={event.id} event={event} />
                ))}
              </div>
            )
          ) : (
            <EventsMap events={filtered} center={mapCenter} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;
