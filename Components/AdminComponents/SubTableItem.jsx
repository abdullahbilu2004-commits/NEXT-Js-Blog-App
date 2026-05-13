import React from 'react'

const SubTableItem = ({email,mongoId,date,deleteEmail}) => {
        const emailDate = new Date(date)

  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap font-medium'>
        {email?email:"No E-Mail"}
      </th>
      <td className='px-4 py-6 hidden sm:block'>{emailDate.toDateString()} </td>
        <td onClick={()=>deleteEmail(mongoId)} className='px-4 py-6 cursor-pointer'> x </td>
    </tr>
  )
}

export default SubTableItem
