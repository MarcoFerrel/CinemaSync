export default async function MoviesPage() {
  const response = await fetch("http://localhost:3000/api/movies")
  const data = await response.json()

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Popular Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.results.map((movie: any) => (
          <div key={movie.id} className="flex flex-col gap-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-full"
            />
            <h2 className="text-sm font-semibold">{movie.title}</h2>
            <p className="text-yellow-400 text-sm">⭐ {movie.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
    </main>
  )
}