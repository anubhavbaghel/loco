import { CalendarDays, MapPin } from "lucide-react"

const EventsCard = () => {
  return (
    <div className="scroll-item flex flex-col items-stretch border border-none rounded-2xl overflow-hidden shadow-md min-w-[60%]">
        <div className="event-card-img-section flex-1 ">
            <img src="/assets/event-demo-img.avif" alt="Concert crowd with stage lighting and performers during a live music event in a large indoor venue, conveying an energetic and excited atmosphere"/>
        </div>
        <div className="border-none rounded-2xl event-card-short-info-section flex flex-col px-3 py-5 gap-3 items-start">
            <p className="bg-purple-200 border-none rounded-2xl text-purple-600 w-fit px-3 font-bold">Live Concert</p>
            <h3 className="text-wrap leading-5 text-lg font-bold">The Local Train - Live in Bengaluru</h3>
            <div className="flex flex-row items-center w-full gap-2">
                <CalendarDays />
                <p>24 May - 7:00 PM</p>
            </div>
            <div className="flex flex-row items-center w-full gap-2">
                <MapPin />
                <p>Pheonix Market City</p>
            </div>
        </div>
    </div>
  )
}

export default EventsCard