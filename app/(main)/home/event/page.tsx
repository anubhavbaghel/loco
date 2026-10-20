"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/ui/Header";
import { SectionSpinner } from "@/app/components/ui/Skeletons";
import { useLocationStore, useIsSaved, useSavedStore } from "@/app/store/globalStore";
import { formatDistanceKm } from "@/lib/events/serialize";
import type { EventDTO } from "@/lib/events/types";
import {
  Bookmark,
  CalendarDays,
  ChevronLeft,
  Clock,
  ExternalLink,
  MapPin,
  Share2,
} from "lucide-react";

type FetchState = {
  key: string;
  status: "loading" | "ready" | "missing";
  event: EventDTO | null;
};

function EventContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") ?? "";

  const coords = useLocationStore((state) => state.coords);
  const isBookmarked = useIsSaved(id);
  const toggleSaved = useSavedStore((state) => state.toggle);

  const [state, setState] = useState<FetchState>({
    key: "",
    status: "loading",
    event: null,
  });

  const key = id ? `${id}|${coords?.lat ?? ""},${coords?.lng ?? ""}` : "";

  const current: FetchState =
    state.key === key
      ? state
      : { key, status: id ? "loading" : "missing", event: null };

  useEffect(() => {
    if (!key) return;

    let active = true;
    const controller = new AbortController();

    (async () => {
      try {
        const params = new URLSearchParams();
        if (coords) {
          params.set("lat", String(coords.lat));
          params.set("lng", String(coords.lng));
        }
        const res = await fetch(`/api/events/${encodeURIComponent(id)}?${params}`, {
          signal: controller.signal,
        });
        if (!active) return;
        if (!res.ok) {
          setState({ key, status: "missing", event: null });
          return;
        }
        const data = (await res.json()) as EventDTO;
        if (!active) return;
        setState({ key, status: "ready", event: data });
      } catch (error) {
        if (!active || (error as Error).name === "AbortError") return;
        setState({ key, status: "missing", event: null });
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [key, id, coords]);

  const event = current.event;
  const loading = current.status === "loading";
  const notFound = current.status === "missing";

  const distance = formatDistanceKm(event?.distanceKm);

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-white pb-24 md:pb-10">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-5 md:px-8">
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              aria-label="Copy link"
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => toggleSaved(id)}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark event"}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>
        </div>

        {loading ? (
          <SectionSpinner label="Loading event…" />
        ) : notFound || !event ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-xl border border-gray-200 px-6 py-16 text-center">
            <h1 className="text-base font-semibold text-gray-900">Event not found</h1>
            <p className="text-sm text-gray-500">This event may have ended or been removed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="aspect-[16/9] w-full rounded-xl border border-gray-200 object-cover"
                />
              )}

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${event.categoryBg} ${event.categoryTextColor}`}
                  >
                    {event.category}
                  </span>
                  {distance && (
                    <span className="text-xs text-gray-500">{distance}</span>
                  )}
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                  {event.title}
                </h1>
              </div>

              <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 px-5 py-4">
                  <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-4">
                  <Clock className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-4">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-gray-700">{event.location}</span>
                </div>
                {event.address && event.address !== event.location && (
                  <div className="flex items-start gap-3 bg-gray-50/60 px-5 py-3">
                    <span className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="text-xs leading-relaxed text-gray-500">
                      {event.address}
                    </span>
                  </div>
                )}
              </div>

              {event.description && (
                <section className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-gray-900">About this event</h2>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                    {event.description}
                  </p>
                </section>
              )}

              <section className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                    {event.organizer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500">Organized by</p>
                    <p className="text-sm font-medium text-gray-900">{event.organizer}</p>
                  </div>
                </div>
                {event.sourceName && (
                  <span className="text-[11px] text-gray-400">via {event.sourceName}</span>
                )}
              </section>
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-20 xl:col-span-4">
              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                    Tickets
                  </span>
                  <span className="text-2xl font-semibold text-gray-900">{event.price}</span>
                </div>

                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  <div className="flex items-center justify-between py-3 text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-900">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 text-sm">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-900">{event.time}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 text-sm">
                    <span className="text-gray-500">Venue</span>
                    <span className="max-w-[60%] truncate font-medium text-gray-900">
                      {event.location}
                    </span>
                  </div>
                  {event.city && (
                    <div className="flex items-center justify-between py-3 text-sm">
                      <span className="text-gray-500">City</span>
                      <span className="font-medium text-gray-900">{event.city}</span>
                    </div>
                  )}
                </div>

                {event.url ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Get tickets on {event.sourceName ?? "source"}</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Tickets unavailable</span>
                  </button>
                )}

                <p className="text-center text-[11px] text-gray-400">
                  Tickets are sold by the official source.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

const EventIndividual = () => {
  return (
    <Suspense fallback={<SectionSpinner label="Loading event…" />}>
      <EventContent />
    </Suspense>
  );
};

export default EventIndividual;
