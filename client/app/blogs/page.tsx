"use client";
import { useEffect, useState } from "react";
import AdminPanel from "./(components)/AdminPanel";
import BlogCard from "./(components)/BlogCard";
import ArchiveHeader from "./(components)/ArchiveHeader";

export default function Blogs() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  },[]);


  return (
    <>
      {accessToken && (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
          <AdminPanel />
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-gray-800 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ArchiveHeader/>
          <BlogCard />
        </div>
      </div>
    </>
  );
}
