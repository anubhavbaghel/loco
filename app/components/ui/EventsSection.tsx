import EventsCard from "./EventsCard"
import "./EventsSection.css"

const EventsSection = () => {
  return (
    <div className="flex flex-col p-3">
        <h3 className="font-bold text-lg">What is happening near me?</h3>
        <div className="flex flex-row scroll-container-event">
        <EventsCard/>
        <EventsCard/>
        <EventsCard/>
        <EventsCard/>
    </div>
    </div>
  )
}

export default EventsSection