import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ScrollCards({ children }) {
  const wrapperRef = useRef(null);

  const scroll = (direction) => {
    if (wrapperRef.current) {
      const scrollAmount = 250;
      wrapperRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full md:w-3/4 overflow-hidden px-0 md:px-4 rounded-2xl shadow-sm dark:shadow-button-border mx-auto">
      {/* Buttons */}
      <button
        onClick={() => scroll("prev")}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-main/60 hover:bg-main hover:scale-105 transition duration-300 text-white p-1.5 md:p-3 rounded-full z-10 border-2 border-white"
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        onClick={() => scroll("next")}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-main/60 hover:bg-main hover:scale-105 transition duration-300 text-white p-1.5 md:p-3 rounded-full z-10 border-2 border-white"
      >
        <ArrowForwardIosIcon />
      </button>

      {/* Scroll Box */}
      <div
        ref={wrapperRef}
        className="
          grid grid-flow-col auto-cols-max
          grid-rows-1
          gap-4 overflow-x-auto no-scrollbar scroll-smooth
          snap-x snap-mandatory p-4
        "
      >
        {children}
      </div>
    </div>
  );
}
