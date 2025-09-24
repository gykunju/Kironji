import '../App.css'
import React from "react";

export default function MasonryGallery({ items = [] }) {
  return (
    <div className="w-full mx-auto flex gap-4 space-y-4 overflow-y-auto horizontal-scroll snap-x snap-mandatory">
      {items.map((item, i) => (
          <img
            src={item.img}
            alt={item.title || `Memory ${i + 1}`}
            className="w-full object aspect-[3/4] group-hover:scale-105 transition-transform duration-300"
            style={{ minHeight: 200, maxHeight: 200 }}
          />
      ))}
    </div>
  );
}
