"use client";

import { useState } from "react";
import Header from "@/app/components/ui/Header";
import EventsCard from "@/app/components/ui/EventsCard";
import { MOCK_VIBES } from "@/lib/mockData";
import { Heart, Sparkles, Compass, BookmarkCheck, Share2 } from "lucide-react";
import Link from "next/link";

const SavedPage = () => {
  const [activeTab, setActiveTab] = useState<"saved" | "liked" | "past">("saved");
  const [savedItems, setSavedItems] = useState(MOCK_VIBES.slice(0, 3));

  const removeSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col w-full min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-gray-50 pb-28">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-4 pt-2">
        {/* Header section */}
        <section className="pt-2 pb-1 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-violet-600" />
            <span>Your Bookmarks</span>
          </div>
          <h1 className="font-black text-2xl md:text-3xl text-gray-900 tracking-tight">Saved Vibes & Favorites</h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            Keep track of concerts, food markets & rooftop sessions you love
          </p>
        </section>

        {/* Tabs */}
        <section className="py-1">
          <div className="flex bg-gray-200/60 p-1 rounded-2xl gap-1 max-w-md">
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "saved"
                  ? "bg-white text-violet-600 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Saved Events ({savedItems.length})
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "liked"
                  ? "bg-white text-violet-600 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Liked Places (2)
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "past"
                  ? "bg-white text-violet-600 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past Vibes (5)
            </button>
          </div>
        </section>

        {/* Main List */}
        <main className="py-2">
          {activeTab === "saved" && (
            <div>
              {savedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {savedItems.map((vibe) => (
                    <div key={vibe.id} className="relative group flex flex-col">
                      <EventsCard vibe={vibe} />
                      <div className="mt-2.5 flex items-center justify-between px-2">
                        <button
                          onClick={() => removeSavedItem(vibe.id)}
                          className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                        >
                          Remove from saved
                        </button>
                        <button
                          onClick={() => alert(`Shared ${vibe.title}!`)}
                          className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="py-16 text-center flex flex-col items-center gap-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs max-w-md mx-auto">
                  <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center">
                    <BookmarkCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">No saved vibes yet</h3>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Hit the heart icon on any concert, food pop-up, or rooftop session to save it here for quick access.
                  </p>
                  <Link
                    href="/explore"
                    className="mt-2 flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <Compass className="w-4 h-4" /> Explore Vibes
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "liked" && (
            <div className="py-12 text-center flex flex-col items-center gap-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs max-w-md mx-auto">
              <Sparkles className="w-10 h-10 text-amber-400" />
              <h3 className="font-bold text-gray-900 text-base">Liked Places</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                You haven&apos;t favorited any specific venues or places yet.
              </p>
            </div>
          )}

          {activeTab === "past" && (
            <div className="py-12 text-center flex flex-col items-center gap-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs max-w-md mx-auto">
              <Heart className="w-10 h-10 text-violet-400" />
              <h3 className="font-bold text-gray-900 text-base">Past Vibes & Attended Events</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Events you attended in the past will be logged here automatically.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SavedPage;
