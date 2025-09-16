import coffee from "../assets/macchiato.png";

function Memories() {
  const memories = [
    {
      id: 1,
      thumbnail: coffee,
      title: "The Bar",
      date: new Date("2025-03-18"),
    },
    {
      id: 2,
      thumbnail: coffee,
      title: "Oris Place",
      date: new Date("2025-03-18"),
    },
    {
      id: 3,
      thumbnail: coffee,
      title: "Picnic",
      date: new Date("2025-03-18"),
    },
    {
      id: 4,
      thumbnail: coffee,
      title: "Cycling",
      date: new Date("2025-03-18"),
    },
    {
      id: 5,
      thumbnail: coffee,
      title: "Cycling",
      date: new Date("2025-03-18"),
    },
    {
      id: 6,
      thumbnail: coffee,
      title: "Cycling",
      date: new Date("2025-03-18"),
    },
    {
      id: 7,
      thumbnail: coffee,
      title: "Cycling",
      date: new Date("2025-03-18"),
    },
    {
      id: 8,
      thumbnail: coffee,
      title: "Cycling",
      date: new Date("2025-03-18"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-24 p-6 gap-3 bg-[#22023a]">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-[#E673AC] text-center drop-shadow">
          Memories
        </h1>
        <button className="ml-4 absolute right-4 px-4 py-2 rounded-xl bg-[#22023a] text-[#E673AC] font-bold hover:bg-[#E673AC] hover:text-[#22023a] shadow transition border border-[#E673AC]">
          Add
        </button>
      </div>
      <div className="w-full mb-3">
        <input
          type="text"
          className="w-full border-2 border-[#E673AC] rounded-lg p-2 text-xl focus:ring-2 focus:ring-[#E673AC] outline-none bg-[#22023a] text-[#E673AC] placeholder-[#E673AC]/60"
          placeholder="Search Memory"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {memories.map((mem) => (
          <div
            className="col-span-1 rounded-xl shadow  flex flex-col items-center"
            key={mem.id}
          >
            <img src={mem.thumbnail} className="rounded-xl w-full mb-2" />
            <div className="w-full">
              <h2 className="text-xl font-sm text-[#E673AC]">{mem.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Memories;
