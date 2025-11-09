"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  description: string;
}

export default function BlogCard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReadMore(id:number) {
    try {
      router.push(`/blogs/${id}`);
    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
          The Archive
        </h1>
        <p className="text-gray-400 text-center mb-16 text-sm uppercase tracking-widest">
          Thoughtful writings. Minimalist design.
        </p>

        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((el, index) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group border border-white/20 rounded-2xl p-6 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-3 group-hover:text-white text-gray-100 transition-colors">
                  {el.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {el.description}
                </p>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={()=>handleReadMore(el.id)}
                    className="text-xs font-medium border border-white/30 rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
                  >
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
