import { useRef, useState, useEffect } from "react";

export default function CoverflowCarousel({ images = [] }) {
  const containerRef = useRef(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const imgWidth = 224; // w-56
  const gap = 32; // gap-8

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = container;
      const idx = Math.round(
        (scrollLeft + offsetWidth / 2 - imgWidth / 2) / (imgWidth + gap)
      );
      setCenterIdx(Math.max(0, Math.min(images.length - 1, idx)));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto flex gap-8 py-4 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-[#E673AC]/60 scrollbar-track-transparent snap-x snap-mandatory relative h-80"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {images.map((img, i) => {
        const offset = i - centerIdx;
        let style = {};
        if (offset === 0) {
          style = {
            transform: "scale(1.1) rotateY(0deg)",
            zIndex: 30,
            boxShadow: "0 8px 32px #E673AC88",
            border: "4px solid #E673AC",
            opacity: 1,
          };
        } else if (Math.abs(offset) === 1) {
          style = {
            transform: `scale(0.9) rotateY(${offset * 30}deg)`,
            zIndex: 20,
            boxShadow: "0 2px 8px #22023a44",
            border: "2px solid #E673AC",
            opacity: 0.7,
          };
        } else {
          style = {
            transform: `scale(0.7) rotateY(${offset * 50}deg)`,
            zIndex: 10,
            boxShadow: "0 1px 4px #22023a22",
            border: "1px solid #E673AC",
            opacity: 0.3,
          };
        }
        return (
          <img
            key={i}
            src={img}
            alt="coverflow"
            className="w-56 h-72 object-cover rounded-xl transition-all duration-500 bg-[#22023a] flex-shrink-0 snap-center"
            style={style}
          />
        );
      })}
    </div>
  );
}
