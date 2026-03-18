import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/movies/${id}`);
  const movie = await response.json();

  const reviews = await prisma.review.findMany({
    where: { movieId: Number(id) },
    include: { user: true },
  });

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero backdrop */}
      <div className="relative w-full h-96">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-2">
            {movie.release_date} · ⭐ {movie.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
        {/* Movie info */}
        <div className="flex gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg w-48 flex-shrink-0"
          />
          <div className="flex flex-col gap-4">
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        {/* Reviews section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet. Be the first!</p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-900 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    {review.user.image && (
                      <img
                        src={review.user.image}
                        alt={review.user.name ?? ""}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="font-semibold">{review.user.name}</span>
                    <span className="text-yellow-400 text-sm ml-auto">
                      ⭐ {review.rating}/10
                    </span>
                  </div>
                  <h3 className="font-bold">{review.title}</h3>
                  <p className="text-gray-400 text-sm">{review.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
