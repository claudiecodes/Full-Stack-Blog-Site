import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
  
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold tracking-tight">The Archive</h1>
        <Link href={'/register'}>
        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition-all">
            Get Started
          </button>
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Welcome to <span className="text-gray-700">The Archive</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-10">
          Dive into stories, thoughts, and insights shared by writers around the
          world. Start exploring now.
        </p>

        <Link href="/blogs">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-700 transition-all">
            Start Reading
          </button>
        </Link>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} The Archive. All rights reserved.
      </footer>
    </div>
  );
}
