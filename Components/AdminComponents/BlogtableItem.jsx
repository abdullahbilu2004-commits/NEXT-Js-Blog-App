import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import "react-toastify/dist/ReactToastify.css";

const BlogtableItem = ({ authorImg, title , author,date,deleteBlogs,mongoId }) => {
  
    const blogDate = new Date(date);

    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image src={authorImg ? authorImg : assets.profile_icon} alt='' width={40} height={40} />
                <p>{author?author:"No author"}</p>
            </th>

            <td className='px-6 py-4'>
                {title ? title : "no title"}
            </td>

            <td className='px-6 py-4'>
               {blogDate.toDateString()}
            </td>

            <td onClick={()=>deleteBlogs(mongoId)} className='px-6 py-4 cursor-pointer'>
                x
            </td>

        </tr>
    )
}

export default BlogtableItem
