

import Link from "next/link";

export default function Home() {
  return (
   <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white">

    
      <header className="flex justify-between items-center px-10 py-5 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight">The Archive</h1>
        <Link href="/register">
          <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all shadow-sm">
            Get Started
          </button>
        </Link>
      </header>

    
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              The Archive
            </span>
          </h2>

          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Thoughtful writings. Minimalist design.  
            A quiet corner for readers and thinkers alike.
          </p>

          <Link href="/blogs">
            <button className="px-8 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-all shadow-md">
              Start Reading →
            </button>
          </Link>
        </div>
      </main>

    
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} <span className="font-medium text-gray-300">The Archive</span>. All rights reserved.
      </footer>
    </div>
  );
}
