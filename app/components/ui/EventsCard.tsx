"use client";

import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { VibeItem, MOCK_VIBES } from "@/lib/mockData";

interface EventsCardProps {
  vibe?: VibeItem;
}

const EventsCard = ({ vibe = MOCK_VIBES[0] }: EventsCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="relative group min-w-[260px] max-w-[280px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300">
      <Link href={`/home/event?id=${vibe.id}`} className="block">
        {/* Image & Overlay */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <img
            src={vibe.image}
            alt={vibe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${vibe.categoryBg} ${vibe.categoryTextColor}`}>
              {vibe.category}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{vibe.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2.5">
          <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-violet-600 transition-colors">
            {vibe.title}
          </h3>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            <CalendarDays className="w-4 h-4 text-violet-500 shrink-0" />
            <span className="truncate">{vibe.date} • {vibe.time}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="truncate">{vibe.location}</span>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {vibe.price}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">Explore →</span>
          </div>
        </div>
      </Link>

      {/* Heart Bookmark Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsSaved(!isSaved);
        }}
        aria-label="Bookmark vibe"
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 shadow-md transition-all active:scale-95"
      >
        <Heart className={`w-4 h-4 transition-colors ${isSaved ? "fill-rose-500 text-rose-500" : "text-gray-600"}`} />
      </button>
    </div>
  );
};

export default EventsCard;

