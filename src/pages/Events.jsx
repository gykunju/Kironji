// import { Calendar } from "../components/ui/calendar";
import react, {useState } from 'react'

function Events() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen gap-3 bg-[#22023a] p-6 pb-24 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#E673AC] drop-shadow">Events</h1>
      <button className="rounded-xl px-8 py-2 text-lg font-bold text-[#22023a] bg-[#E673AC] hover:bg-[#22023a] hover:text-[#E673AC] shadow transition border border-[#E673AC]">
        Create Event
      </button>
      <div className="text-md text-[#E673AC]">This is the Events page.</div>
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      /> */}
    </div>
  );
}

export default Events;
