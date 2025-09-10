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
    <div className="min-h-screen flex flex-col p-5 gap-10 bg-gradient-to-br from-[#E673AC] via-white to-[#469110]/20">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-extrabold text-[#469110] text-center drop-shadow">
          Memories
        </h1>
        <button className="ml-4 px-4 py-2 rounded-full bg-[#469110] text-white font-bold hover:bg-[#00520A] shadow transition">
          Add
        </button>
      </div>
      <div className="w-full mb-6">
        <input
          type="text"
          className="w-full border-2 border-[#469110] rounded-lg p-2 text-xl focus:ring-2 focus:ring-[#E673AC] outline-none"
          placeholder="Search Memory"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {memories.map((mem) => (
          <div
            className="col-span-1 bg-white rounded-xl shadow border border-[#E673AC]/30 p-3 flex flex-col items-center"
            key={mem.id}
          >
            <img src={mem.thumbnail} className="rounded-xl w-full mb-2" />
            <div className="w-full text-center">
              <h2 className="text-lg text-[#00520A]">
                {mem.date.toLocaleDateString()}
              </h2>
              <h2 className="text-xl font-bold text-[#469110]">{mem.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Memories;
