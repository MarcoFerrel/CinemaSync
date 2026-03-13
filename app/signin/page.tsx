import { signIn } from "@/auth"

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6">
      <h1 className="text-4xl font-bold">Sign in to CinemaSync</h1>
      <form
        action={async () => {
          "use server"
          await signIn("google", { redirectTo: "/movies" })
        }}
      >
        <button
          type="submit"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200"
        >
          Sign in with Google
        </button>
      </form>
    </main>
  )
}