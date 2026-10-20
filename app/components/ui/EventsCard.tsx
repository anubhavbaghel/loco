"use client";

import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useIsSaved, useSavedStore } from "@/app/store/globalStore";
import { formatDistanceKm } from "@/lib/events/serialize";
import type { EventDTO } from "@/lib/events/types";

interface EventsCardProps {
  event: EventDTO;
}

const EventsCard = ({ event }: EventsCardProps) => {
  const isSaved = useIsSaved(event.id);
  const toggle = useSavedStore((state) => state.toggle);
  const distance = formatDistanceKm(event.distanceKm);

  return (
    <div className="group relative w-full min-w-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-violet-300 md:min-w-0">
      <Link href={`/home/event?id=${event.id}`} className="block">
        <div className="relative h-44 w-full bg-gray-100">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
              No image
            </div>
          )}
          <span
            className={`absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium ${event.categoryTextColor}`}
          >
            {event.category}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-accent">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="truncate">
              {event.date} · {event.time}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2.5">
            <span className="text-xs font-semibold text-gray-900">{event.price}</span>
            {distance ? (
              <span className="text-xs text-gray-500">{distance}</span>
            ) : event.rating != null ? (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {event.rating}
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(event.id);
        }}
        aria-label={isSaved ? "Remove from saved" : "Save event"}
        className="absolute right-3 top-3 rounded-lg bg-white/90 p-1.5 text-gray-600 shadow-sm transition-colors hover:text-accent"
      >
        <Heart className={`h-4 w-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
      </button>
    </div>
  );
};

export default EventsCard;
