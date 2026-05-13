"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Benett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value; // ✅ fixed typo "valaue"
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg); // ✅ fixed typo "authoImgr"
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) { // ✅ fixed typo "sucess"
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Benett",
          authorImg: "/author_img.png",
        })
      } else {
        toast.error("Error");
      }
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 pl-16" onSubmit={onSubmitHandler}>
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="Thumbnail"
            className="mt-5"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])} // ✅ fixed from onClick
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          type="text"
          value={data.title}
          placeholder="Type Here"
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="Write Content Here"
          rows={6}
          required
          className="w-full sm:w-[500px] mt-4 outline-0 border-gray-400 px-4 py-3 border"
        />

        <p className="text-xl mt-4">Blog Category</p>
        <select
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          onChange={onChangeHandler}
          value={data.category}
          name="category"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option> {/* ✅ fixed typo "Techonology" */}
          <option value="LifeStyle">LifeStyle</option>
        </select>
        <br />
        <button
          type="submit"
          className="w-40 mt-8 py-3 font-bold px-4 bg-black text-white h-12 cursor-pointer"
        >
          ADD
        </button>
      </form>

    </>
  );
};

export default page;
