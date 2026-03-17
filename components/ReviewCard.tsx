"use client"

interface MovieCardProps {
  id: number
  title: string
  posterPath: string
  rating: number
}

export default function MovieCard({ id, title, posterPath, rating }: MovieCardProps) {

  async function handleSave() {
    const response = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: id,
        movieTitle: title,
        posterPath: posterPath,
      })
    })
    if (response.ok) {
      alert("Saved to watchlist!")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="rounded-lg w-full"
      />
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-yellow-400 text-sm">⭐ {rating.toFixed(1)}</p>
      <button
        onClick={handleSave}
        className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
      >
        + Watchlist
      </button>

    </div>
  )
}