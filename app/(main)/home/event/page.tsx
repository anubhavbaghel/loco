import { Bookmark, ChevronLeft, Share } from "lucide-react";
import Link from "next/link";

const EventIndividual = () => {
  
  return (
    <div className="h-full flex flex-col w-full">
      <div className="event-header flex items-center justify-between w-full px-3 py-4 z-10">
        <Link href="/home" className="bg-white rounded-full p-2">
          <ChevronLeft className="" />
        </Link>
        <div className="flex w-fit items-between gap-3">
          <button className="bg-white rounded-full p-2"><Share className="" /></button>
          <button className="bg-white rounded-full p-2"><Bookmark className="" /></button>
        </div>
      </div>
      <div className="event-image-container flex-1 w-full absolute top-0 left-0">
        <img
          src="/assets/event-demo-img.avif"
          alt="Concert crowd with stage lighting and performers during a live music event in a large indoor venue, conveying an energetic and excited atmosphere"
        />
      </div>
    </div>
  );
};

export default EventIndividual;
