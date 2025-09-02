import coffee from '../assets/macchiato.png'
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
    <div className="text-3xl text-black border-3 min-h-screen flex flex-col p-5 gap-5">
        <div className='flex items-center justify-between'>
            <div>
                <img src={coffee} className='rounded-full h-[60px]'/>
            </div>
            <div>
                <h1>Home</h1>
            </div>
            <div className='text-lg'>
                Logout
            </div>
        </div>
        <div className=' flex justify-center'>
            <button className='self-center rounded-4xl px-20 text-2xl py-2 font-medium text-slate-200 bg-[#384959]'>Snap a photo</button>
        </div>
        <div className='flex flex-col gap-5 text-slate-700 font-bold'>
            <h1>Today😝</h1>
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
)
}

export default Home