"use client";

import { useState } from "react";
import Header from "@/app/components/ui/Header";
import EventsCard from "@/app/components/ui/EventsCard";
import { MOCK_VIBES } from "@/lib/mockData";
import { Search, Map, LayoutGrid, Filter, Compass } from "lucide-react";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filterChips = ["All", "Tonight", "Weekend", "Free Entry", "Top Rated"];

  const filteredVibes = MOCK_VIBES.filter((vibe) => {
    const matchesSearch =
      vibe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vibe.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vibe.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "Free Entry") return matchesSearch && vibe.price.toLowerCase().includes("free");
    if (activeFilter === "Top Rated") return matchesSearch && vibe.rating >= 4.8;
    if (activeFilter === "Tonight") return matchesSearch && (vibe.isHappeningToday || vibe.category === "Nightlife");

    return matchesSearch;
  });

  return (
    <div className="flex flex-1 flex-col w-full min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-gray-50 pb-28">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-4 pt-2">
        {/* Explore Header */}
        <section className="pt-2 pb-1 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Explore Vibes</span>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-black text-2xl md:text-3xl text-gray-900 tracking-tight">Find Your Next Experience</h1>
            
            {/* View Toggle */}
            <div className="flex items-center bg-gray-200/70 p-1 rounded-xl gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "grid" ? "bg-white text-violet-600 shadow-xs font-bold" : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "map" ? "bg-white text-violet-600 shadow-xs font-bold" : "text-gray-600 hover:text-gray-900"
                }`}
                aria-label="Map View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Search Input */}
        <section className="py-1">
          <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all max-w-2xl">
            <Search className="w-5 h-5 text-gray-400 ml-1 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by venue, music genre, or food..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </section>

        {/* Quick Filter Chips */}
        <section className="py-1">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  activeFilter === chip
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Main Content Area */}
        <main className="py-2">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVibes.map((vibe) => (
              <EventsCard key={vibe.id} vibe={vibe} />
            ))}

            {filteredVibes.length === 0 && (
              <div className="col-span-full py-12 text-center flex flex-col items-center gap-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                <Filter className="w-10 h-10 text-gray-300" />
                <h3 className="font-bold text-gray-800 text-base">No vibes found</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Try adjusting your search terms or selecting a different filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-2 text-xs font-bold text-violet-600 bg-violet-50 px-4 py-2 rounded-xl hover:bg-violet-100 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Map Preview View */
          <div className="relative w-full h-[450px] bg-slate-900 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between p-4 border border-slate-800">
            {/* Map background placeholder styling */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex justify-between items-center bg-slate-800/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Map View • Bengaluru
              </span>
              <span className="text-[11px] font-semibold text-slate-400">{filteredVibes.length} Locations</span>
            </div>

            {/* Simulated Pins */}
            <div className="relative z-10 flex-1 my-4 flex items-center justify-around flex-wrap gap-4 p-4">
              {filteredVibes.slice(0, 4).map((vibe) => (
                <div
                  key={vibe.id}
                  className="group relative bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-violet-200 cursor-pointer hover:scale-110 transition-transform flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-violet-600" />
                  <span className="text-xs font-extrabold text-gray-900">{vibe.title.split("-")[0]}</span>
                </div>
              ))}
            </div>

            {/* Active Pin Card Slider */}
            <div className="relative z-10 w-full overflow-x-auto scrollbar-none">
              <div className="flex gap-3">
                {filteredVibes.slice(0, 3).map((vibe) => (
                  <div key={vibe.id} className="min-w-[240px] bg-white rounded-2xl p-2.5 shadow-xl flex gap-3 items-center">
                    <img src={vibe.image} alt={vibe.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <span className="text-[10px] font-bold text-violet-600 uppercase">{vibe.category}</span>
                      <h4 className="text-xs font-bold text-gray-900 truncate">{vibe.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate">{vibe.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
);
};

export default ExplorePage;
