"use client";
import { useRef, useEffect } from "react";

interface WatchlistItem {
  id: string;
  movieTitle: string;
  posterPath: string | null;
}

interface WatchlistCarouselProps {
  watchlist: WatchlistItem[];
}

export default function WatchlistCarousel({watchlist}: WatchlistCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollLeft += 1;
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {watchlist.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-36">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
            alt="item.movieTitle"
            className="rounder-lg w-full"
          />
          <p className="text-sm font-semibold mt-2">{item.movieTitle}</p>
        </div>
      ))}
    </div>
  );
}
