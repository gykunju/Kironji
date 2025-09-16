import { useRef, useState, useEffect } from "react";

export default function Carousel({ images = [] }) {
  const containerRef = useRef(null);
  const [centerIdx, setCenterIdx] = useState(0);

  // Detect which image is centered
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollLeft, offsetWidth } = container;
      const childWidth = 256; // w-64
      const idx = Math.round(
        (scrollLeft + offsetWidth / 2 - childWidth / 2) / (childWidth - 64)
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
      className="w-full max-w-2xl mx-auto overflow-x-auto flex py-4 px-2 scrollbar-thin scrollbar-thumb-[#E673AC]/60 scrollbar-track-transparent snap-x snap-mandatory"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {images.map((img, i) => {
        let z = 0,
          scale = 1,
          opacity = 1,
          filter = "",
          ml = i === 0 ? 0 : -64;
        if (i === centerIdx) {
          z = 30;
          scale = 1.1;
          opacity = 1;
          filter = "none";
        } else if (i === centerIdx - 1 || i === centerIdx + 1) {
          z = 20;
          scale = 0.9;
          opacity = 0.7;
          filter = "blur(1px)";
        } else {
          z = 10;
          scale = 0.8;
          opacity = 0.3;
          filter = "blur(2px)";
        }
        return (
          <div
            key={i}
            className="relative flex-shrink-0 w-58 h-58 snap-center transition-all duration-300"
            style={{
              marginLeft: ml,
              zIndex: z,
              transform: `scale(${scale})`,
              opacity,
              filter,
            }}
          >
            <img
              src={img}
              alt="carousel"
              className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-[#469110]/20 bg-white"
              style={{
                boxShadow:
                  z === 30 ? "0 8px 32px #46911088" : "0 2px 8px #66003322",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
