"use client";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Author {
  name: String;
}
interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt?: string;
  User: Author;
}

export default function BlogDetailCard() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  const fetchBlogId = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
      );

      setBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(blog);
  });
  useEffect(() => {
    fetchBlogId();
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Link href={'/blogs'}>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              The Archive
            </h1>
            </Link>
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              Minimalist Reflections
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : !blog ? (
            <p className="text-center text-gray-500">Blog not found.</p>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/20 rounded-2xl backdrop-blur-lg shadow-xl p-10"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {blog.title}
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                written by {blog.User.name}
              </p>
              {blog.createdAt && (
                <>
                  <p className="text-gray-400 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(blog.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              )}

              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line mb-8 mt-10">
                {blog.description}
              </p>

              <div className="flex justify-end mt-10">
                <button
                  onClick={() => history.back()}
                  className="border border-white/30 text-gray-300 px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
                >
                  ← Back to Archive
                </button>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </>
  );
}
