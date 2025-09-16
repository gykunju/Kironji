function Events() {
  return (
    <div className="min-h-screen gap-3 bg-[#22023a] p-6 pb-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#E673AC] drop-shadow">
        Events
      </h1>
      <button className="rounded-xl px-8 py-2 text-lg font-bold text-[#22023a] bg-[#E673AC] hover:bg-[#22023a] hover:text-[#E673AC] shadow transition border border-[#E673AC]">
        Create Event
      </button>
      <div className="text-xl text-[#E673AC]">
        This is the Events page.
      </div>
    </div>
  );
}

export default Events;
