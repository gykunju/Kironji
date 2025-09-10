function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E673AC] via-white to-[#469110]/20 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-[#469110] mb-8 drop-shadow">
        Events
      </h1>
      <button className="rounded-full px-8 py-2 text-lg font-bold text-white bg-[#469110] hover:bg-[#00520A] shadow transition mb-4">
        Create Event
      </button>
      <div className="text-xl text-[#660033] mt-8">
        This is the Events page.
      </div>
    </div>
  );
}

export default Events;
