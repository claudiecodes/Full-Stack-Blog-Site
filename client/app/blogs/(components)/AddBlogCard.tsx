"use client";

import axios from "axios";
import { useState } from "react";

export default function AddBlogCard() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function handleSubmit() {
    const token = localStorage.getItem("access_token");

    try {
      const {data} = await axios.post(
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
      console.log(data, "<<< add blog card");
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
  return (
    <>
      <div>Add block form</div>
      title :
      <input
        type="text"
        placeholder="Enter title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      description :
      <input
        type="text"
        placeholder="Enter description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button className="border" onClick={handleSubmit}>
        Add
      </button>
    </>
  );
}
