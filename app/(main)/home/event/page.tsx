"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_VIBES, VibeItem } from "@/lib/mockData";
import {
  ChevronLeft,
  Share2,
  Bookmark,
  CalendarDays,
  MapPin,
  Star,
  Ticket,
  CheckCircle2,
} from "lucide-react";

const EventIndividual = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vibeId = searchParams.get("id");

  const vibe: VibeItem =
    MOCK_VIBES.find((v) => v.id === vibeId) || MOCK_VIBES[0];

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedTier, setSelectedTier] = useState<"early" | "general" | "vip">("general");

  const tierPrices = {
    early: 799,
    general: 999,
    vip: 1999,
  };

  const totalPrice = tierPrices[selectedTier] * ticketCount;

  return (
    <div className="flex flex-1 flex-col w-full min-h-screen bg-gray-50 pb-28">
      {/* Hero Image Section */}
      <div className="relative w-full h-[360px] bg-gray-900">
        <img
          src={vibe.image}
          alt={vibe.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/30" />

        {/* Floating Top Actions Bar */}
        <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between z-20">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 shadow-lg transition-all"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Link copied to share ${vibe.title}!`)}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 shadow-lg transition-all"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 shadow-lg transition-all"
              aria-label="Bookmark"
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isBookmarked ? "fill-violet-600 text-violet-600" : "text-gray-800"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Hero Title Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md ${vibe.categoryBg} ${vibe.categoryTextColor}`}>
              {vibe.category}
            </span>
            <div className="bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{vibe.rating} ({vibe.reviewsCount} reviews)</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white leading-tight drop-shadow-md">
            {vibe.title}
          </h1>
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-col gap-5 px-4 pt-4">
        {/* Date, Time & Venue Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Date & Time</p>
              <p className="text-sm font-bold text-gray-900">{vibe.date}</p>
              <p className="text-xs text-gray-500 font-medium">{vibe.time}</p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100" />

          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Venue Location</p>
              <p className="text-sm font-bold text-gray-900">{vibe.location}</p>
              <p className="text-xs text-gray-500 font-medium">{vibe.city}, India</p>
            </div>
          </div>
        </div>

        {/* Organizer Header */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm">
              {vibe.organizer.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400">Hosted by</p>
              <h4 className="text-sm font-bold text-gray-900">{vibe.organizer}</h4>
            </div>
          </div>
          <button
            onClick={() => alert(`Following ${vibe.organizer}!`)}
            className="text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl transition-colors"
          >
            + Follow
          </button>
        </div>

        {/* About Event Description */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
          <h3 className="text-base font-extrabold text-gray-900">About the Experience</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            {vibe.description}
          </p>
        </div>

        {/* Interactive Ticket Tier Selection */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-violet-600" />
            <span>Select Ticket Pass</span>
          </h3>

          <div className="flex flex-col gap-2">
            {/* Early Bird */}
            <div
              onClick={() => setSelectedTier("early")}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                selectedTier === "early"
                  ? "border-violet-600 bg-violet-50/50 shadow-xs"
                  : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-gray-900">Early Bird Access</h4>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Limited</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">General entry + 1 free beverage</p>
              </div>
              <span className="text-sm font-black text-gray-900">₹799</span>
            </div>

            {/* General Admission */}
            <div
              onClick={() => setSelectedTier("general")}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                selectedTier === "general"
                  ? "border-violet-600 bg-violet-50/50 shadow-xs"
                  : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
              }`}
            >
              <div>
                <h4 className="text-xs font-extrabold text-gray-900">General Admission</h4>
                <p className="text-[11px] text-gray-500 font-medium">Standard entry pass</p>
              </div>
              <span className="text-sm font-black text-gray-900">₹999</span>
            </div>

            {/* VIP Pass */}
            <div
              onClick={() => setSelectedTier("vip")}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                selectedTier === "vip"
                  ? "border-violet-600 bg-violet-50/50 shadow-xs"
                  : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-extrabold text-gray-900">VIP Rooftop Lounge Pass</h4>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">VIP</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Fast-track entry, VIP deck access & unlimited drinks</p>
              </div>
              <span className="text-sm font-black text-gray-900">₹1,999</span>
            </div>
          </div>

          {/* Ticket Counter */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
            <span className="text-xs font-bold text-gray-700">Quantity</span>
            <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-full border border-gray-200">
              <button
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="w-7 h-7 rounded-full bg-white text-gray-800 font-black flex items-center justify-center shadow-xs"
              >
                -
              </button>
              <span className="text-xs font-extrabold text-gray-900 px-1">{ticketCount}</span>
              <button
                onClick={() => setTicketCount(ticketCount + 1)}
                className="w-7 h-7 rounded-full bg-white text-gray-800 font-black flex items-center justify-center shadow-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-40 flex items-center justify-between max-w-[500px] mx-auto shadow-2xl">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Total Price</p>
          <p className="text-xl font-black text-gray-900">₹{totalPrice.toLocaleString()}</p>
        </div>
        <button
          onClick={() =>
            alert(`🎉 Booking confirmed! ${ticketCount} ticket(s) reserved for ${vibe.title}.`)
          }
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-violet-500/25 transition-all scale-100 active:scale-95 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Book Passes</span>
        </button>
      </div>
    </div>
  );
};

export default EventIndividual;

