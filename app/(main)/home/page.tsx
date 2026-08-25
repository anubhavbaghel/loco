"use client";

import { useState } from "react";
import EventsSection from "@/app/components/ui/EventsSection";
import Header from "@/app/components/ui/Header";
import { MOCK_CATEGORIES, MOCK_VIBES } from "@/lib/mockData";
import { Search, SlidersHorizontal, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import "./homepage.css";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour < 12) return "Good morning ☀️";
    if (hour < 17) return "Good afternoon 🌤️";
    if (hour < 21) return "Good evening 🌆";
    return "Good night 🌙";
  };

  // Filter vibes based on search or category select
  const filteredVibes = MOCK_VIBES.filter((vibe) => {
    const matchesSearch =
      vibe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vibe.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vibe.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? vibe.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const happeningToday = filteredVibes.filter((v) => v.isHappeningToday || v.isPopular);
  const trendingMusic = filteredVibes.filter((v) => v.category === "Music" || v.category === "Nightlife");
  const foodAndMarkets = filteredVibes.filter((v) => v.category === "Food" || v.category === "Markets" || v.category === "Outdoor");

  return (
    <div className="flex flex-1 flex-col w-full min-h-screen bg-gradient-to-b from-violet-50/50 via-white to-gray-50 pb-24">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-4 pt-2">
        {/* Desktop Featured Spotlight Banner (hidden on small screens) */}
        <section className="hidden md:block w-full my-2">
          <div className="relative w-full h-[280px] lg:h-[320px] rounded-3xl overflow-hidden shadow-xl bg-gray-950 flex items-center justify-between p-8 text-white border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80"
              alt="Featured Concert"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

            <div className="relative z-10 flex flex-col items-start max-w-lg gap-3">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                🔥 Spotlight Feature
              </span>
              <h2 className="text-3xl lg:text-4xl font-black leading-tight drop-shadow-md">
                The Local Train - Live in Bengaluru
              </h2>
              <p className="text-xs lg:text-sm text-gray-300 font-medium line-clamp-2">
                Unmatched indie rock energy, open-air singalongs, and electric stage production under the night sky at Phoenix Marketcity.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/home/event?id=vibe-1"
                  className="bg-white text-gray-900 hover:bg-violet-50 hover:text-violet-700 font-extrabold text-xs px-6 py-3 rounded-full shadow-lg transition-all scale-100 active:scale-95"
                >
                  Book Tickets • ₹799
                </Link>
                <span className="text-xs text-gray-400 font-semibold">24 May • 7:00 PM</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Greeting Section */}
        <section className="pt-2 pb-1 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Local Vibes</span>
          </div>
          <h1 className="font-black text-3xl md:text-4xl tracking-tight text-gray-900 leading-tight">
            {getGreeting()}
          </h1>
          <p className="font-semibold text-gray-500 text-sm md:text-base">
            What vibe are you chasing in <span className="text-violet-600 font-bold">Bengaluru</span> today?
          </p>
        </section>

        {/* Interactive Search Bar */}
        <section className="py-1">
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl shadow-sm border border-gray-200/80 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all max-w-2xl">
            <Search className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live concerts, rooftop sessions, flea markets..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            <Link
              href="/explore"
              className="p-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-xs transition-colors shrink-0"
              aria-label="Filter events"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Link>
          </div>
        </section>

      {/* Category Pill Carousel */}
      <section className="py-3">
        <div className="flex gap-3 overflow-x-auto px-4 scrollbar-none scroll-smooth">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === null
                ? "bg-gray-900 text-white shadow-md scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>All Vibes</span>
          </button>

          {MOCK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.item;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.item)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-violet-50 hover:border-violet-200"
                }`}
              >
                <img
                  src={cat.link}
                  alt={cat.alt}
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span>{cat.item}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Vibes Horizontal Sliders */}
      <main className="flex flex-col gap-4 mt-1">
        <EventsSection
          title="🔥 Happening Today"
          subtitle="Handpicked events popping off right now"
          vibes={happeningToday.length > 0 ? happeningToday : MOCK_VIBES}
        />

        <EventsSection
          title="🎵 Music & Nightlife"
          subtitle="Rooftop DJ sets, indie rock concerts & late night jams"
          vibes={trendingMusic.length > 0 ? trendingMusic : MOCK_VIBES}
        />

        <EventsSection
          title="🍕 Food & Flea Markets"
          subtitle="Artisan pop-ups, midnight food streets & craft stalls"
          vibes={foodAndMarkets.length > 0 ? foodAndMarkets : MOCK_VIBES}
        />
        </main>
      </div>
    </div>
  );
};

export default Homepage;

