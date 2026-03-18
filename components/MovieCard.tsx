"use client";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

export default function MovieCard({
  id,
  title,
  posterPath,
  rating,
}: MovieCardProps) {
  const [showReview, setShowReview] = useState(false);

  async function handleSave() {
    const response = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: id,
        movieTitle: title,
        posterPath: posterPath,
      }),
    });
    if (response.ok) {
      alert("Saved to watchlist!");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/movies/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="rounded-lg w-full"
        />
      </Link>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</p>
      <button
        onClick={handleSave}
        className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
      >
        + Watchlist
      </button>
      <button
        onClick={() => setShowReview(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 rounded"
      >
        Review
      </button>

      {showReview && (
        <ReviewModal
          movieId={id}
          movieTitle={title}
          posterPath={posterPath}
          onClose={() => setShowReview(false)}
        />
      )}
    </div>
  );
}
