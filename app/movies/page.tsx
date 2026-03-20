import MovieCard from "@/components/MovieCard";

export default async function MoviesPage() {
  const response = await fetch("http://localhost:3000/api/movies");
  const data = await response.json();

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.results.map((movie: any) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </main>
  );
}
