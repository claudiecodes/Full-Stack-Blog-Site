"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MyTokenPayload extends JwtPayload {
  name?: string;
}

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const router = useRouter()

  function handleLogout() {
    try {
      localStorage.clear();
      router.push('/blogs')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    if (token) {
      const decoded = jwtDecode<MyTokenPayload>(token);
      if (decoded?.name) {
        setName(decoded.name);
      }
    }
  }, [token]);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-white/20 bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white">
      <ThemeToggle />

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/30 hover:border-white/70 transition">
            <Image src="" alt="Admin Profile" fill className="object-cover" />
          </div>
          <span className="hidden sm:block text-sm font-medium">{name}</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-44 bg-black border border-white/20 rounded-xl shadow-xl overflow-hidden"
            >
              <ul className="flex flex-col text-sm text-gray-200">
                <Link href="/profile" className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                  Profile
                </Link>
                <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                  Dashboard
                </li>
                <li className="px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                  Settings
                </li>
                <li className="border-t border-white/10"></li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-red-400 transition"
                >
                  Logout
                </button>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
