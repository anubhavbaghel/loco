"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_VIBES, VibeItem } from "@/lib/mockData";
import Header from "@/app/components/ui/Header";
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
      {/* Top Header */}
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-6">
        {/* Main 2-Column Split Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols on desktop): Hero Media, Event Details, Host Info & About */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Hero Image Card */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-md bg-gray-900 border border-gray-100">
              <img
                src={vibe.image}
                alt={vibe.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/20" />

              {/* Floating Actions Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
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

              {/* Hero Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md ${vibe.categoryBg} ${vibe.categoryTextColor}`}>
                    {vibe.category}
                  </span>
                  <div className="bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{vibe.rating} ({vibe.reviewsCount} reviews)</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                  {vibe.title}
                </h1>
              </div>
            </div>

            {/* Date, Time & Venue Card */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-violet-50 text-violet-600 rounded-2xl shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Date & Time</p>
                  <p className="text-base font-bold text-gray-900">{vibe.date}</p>
                  <p className="text-xs text-gray-500 font-medium">{vibe.time}</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100" />

              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-rose-50 text-rose-600 rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Venue Location</p>
                  <p className="text-base font-bold text-gray-900">{vibe.location}</p>
                  <p className="text-xs text-gray-500 font-medium">{vibe.city}, India</p>
                </div>
              </div>
            </div>

            {/* Organizer Header */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                  {vibe.organizer.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">Hosted by</p>
                  <h4 className="text-base font-bold text-gray-900">{vibe.organizer}</h4>
                </div>
              </div>
              <button
                onClick={() => alert(`Following ${vibe.organizer}!`)}
                className="text-xs font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-5 py-2.5 rounded-xl transition-colors"
              >
                + Follow
              </button>
            </div>

            {/* About Event Description */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
              <h3 className="text-lg font-extrabold text-gray-900">About the Experience</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {vibe.description}
              </p>
            </div>
          </div>

          {/* Right Column (5 cols on desktop): Sticky Ticket Booking Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-violet-600" />
                  <span>Reserve Ticket Pass</span>
                </h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Instant Confirmation
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Early Bird */}
                <div
                  onClick={() => setSelectedTier("early")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
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
                    <p className="text-xs text-gray-500 font-medium mt-0.5">General entry + 1 free beverage</p>
                  </div>
                  <span className="text-base font-black text-gray-900">₹799</span>
                </div>

                {/* General Admission */}
                <div
                  onClick={() => setSelectedTier("general")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedTier === "general"
                      ? "border-violet-600 bg-violet-50/50 shadow-xs"
                      : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">General Admission</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Standard entry pass</p>
                  </div>
                  <span className="text-base font-black text-gray-900">₹999</span>
                </div>

                {/* VIP Pass */}
                <div
                  onClick={() => setSelectedTier("vip")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
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
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Fast-track entry, VIP deck & unlimited drinks</p>
                  </div>
                  <span className="text-base font-black text-gray-900">₹1,999</span>
                </div>
              </div>

              {/* Ticket Counter */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700">Pass Quantity</span>
                <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-full border border-gray-200">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-full bg-white text-gray-800 font-black flex items-center justify-center shadow-xs hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-sm font-extrabold text-gray-900 px-2">{ticketCount}</span>
                  <button
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="w-8 h-8 rounded-full bg-white text-gray-800 font-black flex items-center justify-center shadow-xs hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Desktop Checkout Summary & CTA */}
              <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-3 border border-gray-100">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                  <span>Subtotal ({ticketCount} pass)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                  <span>Booking Fee</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="w-full h-px bg-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-900">Total Payable</span>
                  <span className="text-xl font-black text-gray-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() =>
                    alert(`🎉 Booking confirmed! ${ticketCount} ticket(s) reserved for ${vibe.title}.`)
                  }
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-sm py-3.5 rounded-full shadow-lg shadow-violet-500/25 transition-all scale-100 active:scale-95 flex items-center justify-center gap-2 mt-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Book Passes Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventIndividual;

