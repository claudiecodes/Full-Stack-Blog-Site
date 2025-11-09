"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBlogCard() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("access_token");

    try {
      const { data } = await axios.post(
        "http://localhost:3000/posts",
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Blog added successfully!");
      setTitle("");
      setDescription("");
      router.push('/blogs')
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to add blog");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/5 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl p-8"
      >
        <h2 className="text-center text-3xl font-bold mb-3">Write a Blog</h2>
        <p className="text-gray-400 text-center mb-8">
          Share your thoughts with{" "}
          <span className="font-semibold text-gray-200">The Archive</span>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Description</label>
            <textarea
              placeholder="Write your blog description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="w-full rounded-lg bg-black/30 border border-white/20 text-white px-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-300 font-semibold rounded-lg py-2 transition-colors"
          >
            {loading ? "Adding..." : "Add Blog"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
        )}

        <p className="text-gray-400 text-center text-sm mt-6">
          <a
            href="/blogs"
            className="text-white hover:text-gray-300 underline underline-offset-2"
          >
            ← Back to Archive
          </a>
        </p>
      </motion.div>
    </div>
    </>
  );
}
