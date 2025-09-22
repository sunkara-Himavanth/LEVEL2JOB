import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';



const JobCard = ({job}) => {
  const navigate= useNavigate();
  return (
    <div className='border p-6 shadow rounded'>
        <div className='flex items-center justify-between'>
            <img class="h-8 " src={assets.company_icon} alt="" />
        </div>
        <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
        <div className='flex items-center gap-3 mt-2 my-2'>
            <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
            <span  className='bg-red-50 border border-blue-200 px-4 py-1.5 rounded'>{job.level}</span>
        </div>
        <p className="text-gray-500 text-sm mt-4"dangerouslySetInnerHTML={{__html: job.description.slice(0,150)}}></p>
        <div className='flex items-center gap-4 text-sm mt-4'>
            <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='bg-blue-600 text-white px-4 py-2 rounded'>Apply Now</button>
            <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn More</button>
        </div>
    </div>
  )
}

export default JobCard
