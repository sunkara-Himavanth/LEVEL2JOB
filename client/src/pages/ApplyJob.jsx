import React from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import { useEffect } from 'react';
import kConvert from 'k-convert';
import moment from 'moment/moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
const ApplyJob = () => {
 const {id}= useParams();
     const [jobData,setJobData] = React.useState(null);
     const {jobs} = useContext(AppContext);
     const fetchJob=async()=>{
         const data= jobs.filter(job=>job._id===id);
         if(data.length!==0){
             setJobData(data[0]);
             console.log(data[0]);
       
         }
     }
 
     React.useEffect(()=>{
       if(jobs.length > 0){
         fetchJob();
       }
     },[id,jobs]);
  
  return jobData ? (
  <>
    <Navbar />

    <div className="min-h-screen py-10 container 2xl:px-20 mx-auto px-4 flex flex-col lg:flex-row gap-8">
      <div className="bg-white p-8 rounded-lg w-full text-black">
        <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img className="h-17 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border" src={jobData?.companyId?.image} alt="" />
            <div className="text-center md:text-left text-neural-800 ">
              <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>
              <div className="flex  flex-row flex-wrap max-md:justify-center items-center gap-6 gap-y-2 mt-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <img src={assets.suitcase_icon} alt="" />
                  {jobData?.companyId?.name}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.location_icon} alt="" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.person_icon} alt="" />
                  {jobData.level}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.money_icon} alt="" />
                  CTC: {kConvert.convertTo(jobData.salary)}
                </span>
              </div>
            </div>
          </div>
             <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md-text-center gap-4 ">
              <button className='bg-blue-600 text-white px-6 py-3 rounded'>
                Apply Now</button>
              <p className='text-sm text-gray-500 mt-2'>Posted {moment(jobData.date).fromNow()}</p>
             
          
             </div>

        </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <div className='w-full lg:w-2/3 text-black'>
              <h2 className='text-2xl font-semibold mb-6'>Job Description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{__html: jobData.description}} />
                <button className="bg-blue-600 text-white px-6 py-3 rounded mt-6">
                     Apply Now
                   </button>

            </div>
            {/* right side */}
             <div className='w-full lg:w-1/3 bg-gray-50 p-6 rounded text-black mt-8 lg:mt-0 lg:ml-8 space-y-5'>
            <h2 className='text-2xl font-semibold mb-6'>More jobs from {jobData.companyId.name}</h2>
            {jobs.filter(job=>job.companyId._id===jobData.companyId._id && job._id!==jobData._id).filter(job=>true).slice(0,3)
            .map((job,index)=><JobCard  key={index} job={job} />)}
              
             </div>
          </div>
      </div>
    </div>
    <Footer />
  </>
) : (
  <Loading />
);

}

export default ApplyJob
