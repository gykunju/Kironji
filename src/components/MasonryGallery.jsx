import '../App.css'

export default function MasonryGallery({ items = [] }) {
  return (
    <div className="w-full mx-auto flex gap-4 overflow-x-auto horizontal-scroll snap-x snap-mandatory pb-2">
      {items.map((item, i) => (
        <div
          key={item.id || i}
          className="flex-shrink-0 w-[200px] snap-center group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-[#C9A961]/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#C9A961]">
            <img
              src={item.img}
              alt={item.title || `Memory ${i + 1}`}
              className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
