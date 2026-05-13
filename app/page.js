"use client"
import Header from "@/Components/Header";
import BlogList from "@/Components/BlogList";
import Fotter from "@/Components/Fotter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
   <>
   <ToastContainer theme="dark" />
   <Header />
   <BlogList />
   <Fotter />
  </>
  );
}

                {/* Here is the problem in author Imgge blogs[id] => page.jsx  */}

