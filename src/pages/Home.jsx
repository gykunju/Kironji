import coffee from "../assets/macchiato.png";
import MasonryGallery from "../components/MasonryGallery";

const items = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 250,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 250,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 250,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 250,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 250,
  },
  // ... more items
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col p-5 pb-24 gap-4\3 bg-[#22023a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <img
            src={coffee}
            className="rounded-full h-[60px] border-4 border-[#E673AC] shadow-lg bg-white/60"
            alt="Profile"
          />
        </div>
        {/* <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#E673AC] drop-shadow tracking-wide">
            Welcome!
          </h1>
          <span className="text-base text-[#a06b9a] font-medium mt-1">
            Have a beautiful day ✨
          </span>
        </div> */}
        <div className="text-md text-[#E673AC] font-semibold cursor-pointer hover:text-[#22023a] hover:bg-[#E673AC]/20 px-4 py-2 rounded-xl transition border border-[#E673AC]/30 shadow-sm">
          Logout
        </div>
      </div>

      {/* Snap Button */}
      <div className="flex justify-center mb-4">
        <button className="flex items-center gap-2 rounded-xl px-8 text-lg py-2 font-bold text-white hover:from-[#d95b9c] hover:to-[#fbeaff] shadow-xl transition border-2 border-[#E673AC]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6.75A2.25 2.25 0 0013.5 4.5h-3A2.25 2.25 0 008.25 6.75v3.75m7.5 0h-7.5m7.5 0v6.75A2.25 2.25 0 0113.5 19.5h-3A2.25 2.25 0 018.25 17.25V10.5m7.5 0h-7.5"
            />
          </svg>
          Snap a photo
        </button>
      </div>

      {/* Gallery Section */}
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-lg font-bold text-[#E673AC] mb-1">
          Today's Snaps
        </h1>
        <MasonryGallery items={items} />
      </div>
    </div>
  );
}

export default Home;
