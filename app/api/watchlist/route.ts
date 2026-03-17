import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  await prisma.watchlistItem.create({
    data: {
      userId: session.user.id,
      movieId: body.movieId,
      movieTitle: body.movieTitle,
      posterPath: body.posterPath,
    }
  })

  return Response.json({ success: true }, { status: 201 })
}