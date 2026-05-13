"use client"
import SubTableItem from '@/Components/AdminComponents/SubTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

  const [emails,setEmails] = useState([]);
 const fetchEmails = async () => {
   const response = await axios.get('/api/email');
   setEmails(response.data.emails)
 }

  useEffect(()=>{
    fetchEmails();
  },[])

  const deleteEmail = async (mongoId) => 
  {
    const response = await axios.delete('/api/email',{
      params:{
        id:mongoId,
        
      }
    }) 
    if(response.data.success)
    {
      toast.success(response.data.msg)
      fetchEmails();
    }
    else
    {
      toast.error("ERROR")
    }
  }

  return (
    <div className='flex-1 px-5 pt-5 sm:px-12 pl-16'>
      <h1 className='font-bold'>All Subscriptions</h1>

      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>E-Mail Subscriptions</th>
              <th scope='col' className='px-6 hidden sm:block py-3'>Date</th>
              <th scope='col' className='px-6 py-3'> Action </th>
            </tr>
          </thead>

          <tbody>
            {emails.map((item,index)=>{
              return <SubTableItem key={index} deleteEmail={deleteEmail} mongoId={item._id} email={item.email} date={item.date} />
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
