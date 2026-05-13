"use client"
import BlogtableItem from '@/Components/AdminComponents/BlogtableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const page = () => {

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);

  }

  const deleteBlogs = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: {
        id: mongoId
      }
    })

    toast.success(response.data.msg);
    fetchBlogs();

  }

  useEffect(() => {
    fetchBlogs();
  }, [])


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Blog Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((items, index) => {

              // Image ka logic sai ho ga tyo author image hudi display ho jy giiii.....

              return <BlogtableItem key={index} mongoId={items._id} title={items.title} author={items.author} authorImg={items.authorImg} date={items.date} deleteBlogs={deleteBlogs} />

            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
