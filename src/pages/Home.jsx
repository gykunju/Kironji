import coffee from "../assets/macchiato.png";
import Masonry from "../Masonry";

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
  // ... more items
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col p-5 gap-5 bg-gradient-to-br from-[#E673AC] via-white to-[#469110]/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <img
            src={coffee}
            className="rounded-full h-[60px] border-2 border-[#469110]"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#469110] drop-shadow">
            Home
          </h1>
        </div>
        <div className="text-lg text-[#469110] font-semibold cursor-pointer hover:text-[#00520A] transition">
          Logout
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <button className="rounded-full px-10 text-2xl py-2 font-bold text-white bg-[#469110] hover:bg-[#00520A] shadow-lg transition">
          Snap a photo
        </button>
      </div>
      <div className="flex flex-col gap-5 text-[#660033] font-bold">
        <h1 className="text-2xl mb-2">Today 😝</h1>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </div>
  );
}

export default Home;
