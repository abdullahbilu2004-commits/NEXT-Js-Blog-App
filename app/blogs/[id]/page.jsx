"use client";
import { assets, blog_data } from "@/Assets/assets";
import Fotter from "@/Components/Fotter";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, use } from "react";

const Page = ({ params }) => {
    const resolvedParams = use(params); // ✅ unwrap the promise
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        const response = await axios.get('/api/blog', {

            params: {
                id: resolvedParams.id // ✅ use unwrapped value
            }

        })
        setData(response.data);
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return data ? (
        <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Link href={`/`}>
                        <Image
                            src={assets.logo}
                            width={180}
                            alt="logo"
                            className="w-[130px] sm:w-auto"
                        />
                    </Link>
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] transition-shadow duration-300">
                        Get Started <Image src={assets.arrow} alt="arrow" />
                    </button>
                </div>

                {/* Blog Title + Author */}
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
                        {data.title}
                    </h1>

                    {/* Here is the problem in author Image */}

                    <Image
                        src={data.authorImg}
                        width={60}
                        height={60}
                        alt="Author Image "
                        className="mx-auto mt-6 border border-white rounded-full"
                    />
                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto font-[500]">
                        {data.author}
                    </p>
                </div>
            </div>

            {/* Blog Image + Description */}
            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={data.image}
                        width={1280}
                        height={720}
                        alt=""
                        className="w-full h-auto border-4 border-white object-cover"
                    />
                </div>
          
                <p className="font-[500]">{data.description}</p>

          <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }} />

                <div className="my-24">
                    <p className="text-black font-semibold my-4">Share this article on social media</p>
                    <div className="flex">
                        <Image src={assets.facebook_icon} width={50} alt="icons" />
                        <Image src={assets.twitter_icon} width={50} alt="icons" />
                        <Image src={assets.googleplus_icon} width={50} alt="icons" />
                    </div>
                </div>

            </div>

            <Fotter />
        </>
    ) : (
        <></>
    );
};

export default Page;
