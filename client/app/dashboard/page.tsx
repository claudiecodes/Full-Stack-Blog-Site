"use client";

import { useEffect, useState } from "react";
import AdminPanel from "../blogs/(components)/AdminPanel";
import BlogCardById from "./(components)/BlogCardById";
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
          <ArchiveHeader />

          <div>
            <BlogCardById accessToken={accessToken} />
          </div>
        </div>
      </div>
    </>
  );
}
