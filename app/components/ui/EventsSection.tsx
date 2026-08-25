import EventsCard from "./EventsCard";
import { VibeItem, MOCK_VIBES } from "@/lib/mockData";
import Link from "next/link";
import "./EventsSection.css";

interface EventsSectionProps {
  title?: string;
  subtitle?: string;
  vibes?: VibeItem[];
}

const EventsSection = ({
  title = "What is happening near me?",
  subtitle,
  vibes = MOCK_VIBES,
}: EventsSectionProps) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex justify-between items-end px-4">
        <div>
          <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
        </div>
        <Link href="/explore" className="text-xs font-bold text-violet-600 hover:text-violet-700 hover:underline">
          See All
        </Link>
      </div>

      <div className="flex flex-row gap-4 overflow-x-auto px-4 pb-3 pt-1 scrollbar-none scroll-smooth">
        {vibes.map((vibe) => (
          <EventsCard key={vibe.id} vibe={vibe} />
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

