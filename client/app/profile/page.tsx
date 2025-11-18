"use client";

import { useEffect, useState } from "react";
import AdminPanel from "../blogs/(components)/AdminPanel";
import BlogCardById from "./(components)/BlogCardById";
import Link from "next/link";
import ArchiveHeader from "../blogs/(components)/ArchiveHeader";

export default function Profile() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  return (
    <>
      {accessToken && (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
          <AdminPanel />
        </div>
      )}
      <div className="min-h-screen bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ArchiveHeader/>
          {/* <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
            The Archive
          </h1>

          <p className="text-gray-500 text-center mb-20 text-sm tracking-widest uppercase">
            Thoughtful writings. Minimalist design.
          </p> */}

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
          <div>
            <BlogCardById accessToken={accessToken} />
          </div>
        </div>
      </div>
    </>
  );
}
