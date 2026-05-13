import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Header = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");

 const onsubmitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", email);

  try {
    const response = await axios.post("/api/email", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  } catch (error) {
    console.error("Email subscription error:", error);
    toast.error("Server error");
  }
};

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
        <button onClick={() => router.push("/admin")} 
         className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000] outline-none focus:outline-none transition-all hover:bg-black hover:text-white">
          Get Started
          <Image src={assets.arrow} alt="Arrow" />
        </button>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Largest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base font-bold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <form
          onSubmit={onsubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your E-Mail"
            className="pl-4 outline-none w-full"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 outline-none focus:outline-none transition-all hover:bg-gray-800 hover:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

