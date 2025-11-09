"use client";

import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterCard() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        { name, email, password }
      );
      setMessage("Registered successfully!");

      router.push("/login");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-neutral-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Register
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Join <span className="font-semibold text-gray-200">The Archive</span>{" "}
          — your stories matter.
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-300 font-semibold rounded-lg py-2 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
        )}

        <p className="text-gray-400 text-center text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white hover:text-gray-300 underline underline-offset-2"
          >
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
