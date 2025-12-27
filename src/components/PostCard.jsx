import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
function PostCard({$id,title,featuredImage}) {



  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-md  hover:shadow-lg transition-shadow duration-300'>
    <div className='w-full justify-center mb-4'>
      <img className='rounded-xl h-50 w-full object-cover ' src={service.getFileView(featuredImage)} alt={title} />
    </div>
    <h2 className='text-lg sm:text-xl font-bold  text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200'>{title}</h2>
   </div>
   </Link>
   
  )
}

export default PostCard
