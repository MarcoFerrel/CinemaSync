export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6">
      <h1 className="text-6xl font-bold text-center">Discover movies you'll love</h1>
      <h2 className="text-xl text-gray-400 text-center">Personalized recommendations powered by AI</h2>
      <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
        Get Started
      </button>
    </main>
  )
}