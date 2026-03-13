import Link from "next/link"
import { auth } from "@/auth"
import { signOut } from "@/auth"
import Image from "next/image"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">CinemaSync</Link>
      <div className="flex items-center gap-6">
        <Link href="/movies">Movies</Link>
        {session ? (
          <div className="flex items-center gap-4">
            <Image
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm">{session.user?.name}</span>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit" className="text-sm text-gray-400 hover:text-white">
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  )
}