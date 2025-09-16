import React from "react";

export default function MasonryGallery({ items = [] }) {
  return (
    <div className="w-full max-w-3xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
      {items.map((item, i) => (
        <a
          key={item.id || i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group overflow-hidden rounded-2xl shadow-lg border-2 border-[#E673AC]/30 bg-white/80 hover:shadow-2xl transition-all"
        >
          <img
            src={item.img}
            alt={item.title || `Memory ${i + 1}`}
            className="w-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
            style={{ minHeight: 200, maxHeight: 400 }}
          />
        </a>
      ))}
    </div>
  );
}
