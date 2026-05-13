import { Bookmark, ChevronLeft, Share } from "lucide-react"

const EventIndividual = () => {
  return (
    <div className="h-full flex flex-col">
        <div className="event-header flex items-center justify-between">
            <ChevronLeft />
            <div className="flex w-fit items-center">
                <Share />
                <Bookmark />
            </div>
        </div>
    </div>
  )
}

export default EventIndividual