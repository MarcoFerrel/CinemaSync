export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    },
  );

  const data = await response.json();

  return Response.json(data);
}
