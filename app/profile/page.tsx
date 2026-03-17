import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WatchlistCarousel from "@/components/WatchListCarousel";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const reviews = await prisma.review.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const watchlist = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-12">
          <Image
            src={session.user.image ?? ""}
            alt={session.user.name ?? ""}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">{session.user.name}</h1>
            <p className="text-gray-400">
              {reviews.length} reviews · {watchlist.length} in watchlist
            </p>
          </div>
        </div>
        {/* Watchlist section */}
        <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
        <WatchlistCarousel watchlist={watchlist} />

        {/* Reviews section */}
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${review.posterPath}`}
                alt={review.movieTitle}
                className="w-full object-cover"
              />
              <div className="p-3 flex flex-col gap-1">
                <p className="text-gray-400 text-xs">{review.movieTitle}</p>
                <h3 className="font-bold text-sm">{review.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {review.body}
                </p>
                <p className="text-yellow-400 text-xs">⭐ {review.rating}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
