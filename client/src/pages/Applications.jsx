import React from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment/moment';
import Footer from '../components/Footer';
const Applications = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [resume, setResume] = React.useState(null);
  return (
    <>
     <Navbar  />
     <div className="min-h-[65vh]  container 2xl:px-20 mx-auto px-4 my-8">
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
      
          {isEdit 
          ? 
          <>
            <label className=" font-medium text-gray-900 flex items-center" htmlFor="resumeUpload">
              <p className=' bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 '>Select Resume</p> 
              <input id="resumeUpload" onChange={e=>setResume(e.target.files[0])} accept="application/pdf" type="file" hidden/>
              <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={()=>setIsEdit(false)} className='bg-green-100 bg border-green-400 rounded-lg px-4 py-2'>Save</button>
          </>
          :<div class="flex gap-2">
            <a className="bg-blue-100 text-blue-300 px-4 py-2 rounded-lg" href="">Resume</a>
            <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
            </div>
  }
       </div>
       <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
       <table  className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className='border-b border-gray-300'>
          <tr className='text-left'>
            <th className='py-3 px-4 pb-2'>Company</th>
            <th className='py-3 px-4 pb-2'>Job Title</th>
            <th className='py-3 px-4 pb-2 max-sm:hidden'>Location</th>
            <th className='py-3 px-4 pb-2 max-sm:hidden'>Date</th>
            <th className='py-3 px-4 pb-2'>Status</th> 
          </tr>
        </thead>
        <tbody>
            {jobsApplied.map((job,index)=>true ? (
              <tr key={index} className='border-b border-gray-200 text-gray-600'>
                <td className='py-3 px-4 flex items-center gap-4'>
                  <img className="w-8 h-8"  src={job.logo} alt=""/>
                  {job.company}
                </td>
                <td classNmae="py-2 px-4 border-b">{job.title}</td>
                <td classNmae="py-2 px-4 border-b max-sm:hidden"> {job.location}</td>
                <td classNmae="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format('ll')} </td>
                <td classNmae="py-2 px-4 border-b">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                   ${job.status==='Pending' ? 'bg-yellow-100 text-yellow-800' : 
                   job.status==='Accepted' ? 'bg-green-100 text-green-800' : 
                   'bg-red-100 text-red-800'}`}>
                  {job.status}
                  </span>
                  </td>
              </tr>
            ):(null))}
           

          </tbody>  
        </table>
     </div>
     <Footer  />
    </>
  )
}

export default Applications