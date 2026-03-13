export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    }
  )

  const data = await response.json()

  return Response.json(data)
}