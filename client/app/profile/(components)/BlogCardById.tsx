"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Author {
  name: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  authorId: number;
  User: Author;
  createdAt: string;
}

export default function BlogCardById({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  async function fetchBlogsByAuthor() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  }



  async function handleDelete(id: number) {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      router.refresh()
      fetchBlogsByAuthor()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogsByAuthor();
  }, [accessToken]);

  return (
    <>
      {blogs?.length > 0 ? (
        <div className="space-y-6 mt-10">
          {blogs?.map((el) => (
            <div
              key={el.id}
              className="
        relative
        border border-white/10 
        bg-black/40
        rounded-xl 
        p-6 
        hover:border-white/30
        transition
        group
      "
            >
              <div
                className="
          absolute 
          top-4 
          right-4 
          flex 
          items-center 
          gap-3 
          opacity-0 
          group-hover:opacity-100 
          transition
        "
              >
                
                <Link href={`/blogs/edit/${el.id}`}>
                <button
                  className="
                  text-xs 
                  px-3 py-1 
                  rounded-md 
                  bg-white/10 
                  hover:bg-white/20 
                  transition
                  "
                  
                  >
                  Edit
                </button>
                  </Link>

                <button
                  className="
            text-xs 
            px-3 py-1 
            rounded-md 
            bg-red-500/20 
            hover:bg-red-500/40 
            transition
          "
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-2 group-hover:opacity-80">
                {el.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                {el.description}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="uppercase tracking-wider">{el.User.name}</span>
                <span className="tracking-wider">
                  {new Date(el.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm tracking-wide uppercase">
              No entries yet.
            </p>
            <p className="text-gray-400 text-xs tracking-widest mt-1">
              Create your first one.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href={"/blogs/add"}>
              <button
                className="
          border border-white/20 
          text-white 
          px-6 py-2 
          text-sm 
          rounded-full
          tracking-wide
          transition 
          hover:border-white 
          hover:bg-white 
          hover:text-black
        "
              >
                + New Entry
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
