"use client";

import { useMemo, useState } from "react";
import Header from "@/app/components/ui/Header";
import EventsCard from "@/app/components/ui/EventsCard";
import { EventCardSkeleton } from "@/app/components/ui/Skeletons";
import { useSavedStore } from "@/app/store/globalStore";
import { useEvents } from "@/lib/useEvents";
import type { EventDTO } from "@/lib/events/types";
import { Bookmark, Compass, FolderOpen } from "lucide-react";
import Link from "next/link";

const SavedPage = () => {
  const [activeTab, setActiveTab] = useState<"saved" | "places" | "past">("saved");

  const ids = useSavedStore((state) => state.ids);
  const remove = useSavedStore((state) => state.remove);
  const hasHydrated = useSavedStore((state) => state.hasHydrated);

  const { events, loading } = useEvents({
    ids,
    enabled: hasHydrated && ids.length > 0,
    limit: 200,
  });

  const ordered = useMemo(() => {
    const byId = new Map(events.map((event) => [event.id, event]));
    return ids
      .map((id) => byId.get(id))
      .filter((event): event is EventDTO => Boolean(event));
  }, [events, ids]);

  const tabs = [
    { key: "saved", label: "Saved", count: ids.length },
    { key: "places", label: "Places", count: 0 },
    { key: "past", label: "Past events", count: 0 },
  ] as const;

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-gray-50 pb-24 md:pb-10">
      <Header />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pt-4 md:px-8">
        <section className="pt-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">Saved</h1>
          <p className="mt-0.5 text-sm text-gray-500">Events you bookmarked for later</p>
        </section>

        <section className="flex max-w-md items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-accent-soft text-accent"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </section>

        <main className="py-2">
          {activeTab === "saved" &&
            (loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            ) : ordered.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {ordered.map((event) => (
                  <div key={event.id} className="flex flex-col">
                    <EventsCard event={event} />
                    <button
                      onClick={() => remove(event.id)}
                      className="mt-2 self-start text-xs font-medium text-gray-500 transition-colors hover:text-accent"
                    >
                      Remove from saved
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Bookmark className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">No saved events</h3>
                <p className="max-w-xs text-xs leading-relaxed text-gray-500">
                  Bookmark any event with the heart icon and it will show up here.
                </p>
                <Link
                  href="/explore"
                  className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-strong"
                >
                  <Compass className="h-3.5 w-3.5" />
                  Explore events
                </Link>
              </div>
            ))}

          {activeTab === "places" && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
              <FolderOpen className="h-8 w-8 text-gray-300" />
              <h3 className="text-sm font-semibold text-gray-900">No saved places</h3>
              <p className="max-w-xs text-xs text-gray-500">Venues you save will be listed here.</p>
            </div>
          )}

          {activeTab === "past" && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
              <FolderOpen className="h-8 w-8 text-gray-300" />
              <h3 className="text-sm font-semibold text-gray-900">No past events</h3>
              <p className="max-w-xs text-xs text-gray-500">Events you attend will be logged here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SavedPage;
