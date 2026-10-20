"use client";

import { useMemo, useState } from "react";
import EventsSection from "@/app/components/ui/EventsSection";
import Header from "@/app/components/ui/Header";
import { CATEGORIES } from "@/lib/events/categories";
import { useEvents } from "@/lib/useEvents";
import { useLocationStore } from "@/app/store/globalStore";
import { isToday } from "@/lib/events/dates";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const city = useLocationStore((state) => state.city);
  const label = useLocationStore((state) => state.label);
  const radiusKm = useLocationStore((state) => state.radiusKm);
  const coords = useLocationStore((state) => state.coords);
  const hasHydrated = useLocationStore((state) => state.hasHydrated);

  const { events, loading, degraded } = useEvents({ limit: 120 });

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return events.filter((event) => {
      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query);
      const matchesCategory = !activeCategory || event.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [events, searchQuery, activeCategory]);

  const featured = useMemo(
    () => events.find((event) => event.image) ?? events[0] ?? null,
    [events],
  );

  const happeningToday = filtered.filter((event) => isToday(event.startDate));
  const music = filtered.filter(
    (event) => event.category === "Music" || event.category === "Nightlife",
  );
  const food = filtered.filter(
    (event) =>
      event.category === "Food" ||
      event.category === "Markets" ||
      event.category === "Outdoor",
  );

  const place = hasHydrated ? (label ?? city) : city;
  const radiusNote =
    coords && label ? `Within ${radiusKm} km of ${label}` : "Across the city";

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-gray-50 pb-24 md:pb-10">
      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pt-4 md:px-8">
        {degraded && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Showing sample data. Add <code>MONGODB_URI</code> and run{" "}
            <code>npm run ingest</code> to load live events.
          </p>
        )}

        {featured && (
          <section className="hidden w-full md:block">
            <div className="relative flex h-[280px] w-full items-center overflow-hidden rounded-xl border border-gray-800 bg-gray-950 p-8 lg:h-[300px]">
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

              <div className="relative z-10 flex max-w-lg flex-col items-start gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">
                  Featured
                </span>
                <h2 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="line-clamp-2 text-sm text-gray-300">
                    {featured.description}
                  </p>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <Link
                    href={`/home/event?id=${featured.id}`}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                  >
                    View event
                  </Link>
                  <span className="text-xs text-gray-400">
                    {featured.date} · {featured.time}
                    {featured.price ? ` · ${featured.price}` : ""}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-1 pt-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
            Events in <span className="text-accent">{place}</span>
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            {radiusNote}
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          </p>
        </section>

        <section>
          <div className="flex max-w-2xl items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 transition-colors focus-within:border-accent">
            <Search className="ml-1 h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search events, venues or categories"
              aria-label="Search events"
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            <Link
              href="/explore"
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-strong"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </Link>
          </div>
        </section>

        <section className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === null
                ? "border-accent bg-accent text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(isActive ? null : category)}
                className={`shrink-0 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </section>

        <main className="flex flex-col gap-4">
          <EventsSection
            title="Happening today"
            subtitle="Events on right now"
            events={happeningToday}
            loading={loading}
            emptyMessage="Nothing scheduled for today in this area."
          />

          <EventsSection
            title="Music & nightlife"
            subtitle="Concerts, club nights and live sessions"
            events={music}
            loading={loading}
            emptyMessage="No music events found nearby."
          />

          <EventsSection
            title="Food & markets"
            subtitle="Pop-ups, food streets and flea markets"
            events={food}
            loading={loading}
            emptyMessage="No food or market events found nearby."
          />
        </main>
      </div>
    </div>
  );
};

export default Homepage;
