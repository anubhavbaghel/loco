import EventsCard from "./EventsCard";
import Link from "next/link";
import type { EventDTO } from "@/lib/events/types";
import { EventCardSkeleton } from "./Skeletons";

interface EventsSectionProps {
  title: string;
  subtitle?: string;
  events: EventDTO[];
  loading?: boolean;
  emptyMessage?: string;
}

const EventsSection = ({
  title,
  subtitle,
  events,
  loading = false,
  emptyMessage = "No events to show here yet.",
}: EventsSectionProps) => {
  return (
    <section className="flex flex-col gap-3 py-2">
      <div className="flex items-end justify-between gap-4 px-4 md:px-0">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-gray-900 md:text-lg">
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
        </div>
        <Link
          href="/explore"
          className="shrink-0 text-xs font-medium text-accent hover:underline"
        >
          View all
        </Link>
      </div>

      {loading ? (
        <div className="no-scrollbar flex flex-row gap-4 overflow-x-auto px-4 pb-1 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="px-4 text-xs text-gray-500 md:px-0">{emptyMessage}</p>
      ) : (
        <div className="no-scrollbar flex flex-row gap-4 overflow-x-auto px-4 pb-1 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4">
          {events.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventsSection;
