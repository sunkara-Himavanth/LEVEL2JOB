import React, { use, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import { jsx } from 'react/jsx-runtime';
import JobCard from './JobCard';
import { useEffect } from 'react';
const JobListing = () => {
  const { isSearched, searchFilter,setSearchFilter,jobs } = useContext(AppContext);
  const [showFilter,setShowFilter] = React.useState(false);
  const [currentPage,setCurrentPage] = React.useState(1);
  const [selectedCategories,setSelectedCategories] = React.useState([]);
  const [selectedLocations,setSelectedLocations] = React.useState([]);
  const [filteredJobs,setFilteredJobs] = React.useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      prev=>prev.includes(category)
      ?prev.filter(c=>c!==category)
      :[...prev,category]
    );
  }
  const handleLocationChange = (location) => {
    setSelectedLocations(
      prev=>prev.includes(location)
        ?prev.filter(c=>c!==location)
      :[...prev,location]
    );
  }
  useEffect(()=>{
    const matchesCategory=job=> selectedCategories.length===0 || selectedCategories.includes(job.category);
    const matchesLocation=job=> selectedLocations.length===0 || selectedLocations.includes(job.location);
    const matchesTitle=job=> searchFilter.title==="" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesLocationFilter=job=> searchFilter.location==="" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());
   
    const newFilteredJobs= jobs.slice().reverse().filter(job=>matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesLocationFilter(job));
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  },[jobs,selectedCategories,selectedLocations,searchFilter]);
  return (
    <div class='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
       <div className='lg:w-1/4 px-4 w-full bg-white'>
      {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
        <>
          <h3 class="font-medium text-lg mb-4">Current search</h3>
          <div class="text-gray-600 mb-4">
            {searchFilter.title && (
              <span className="inline-flex items-center gap-1 mr-4 mb-2 px-4 py-1.5 bg-blue-50 border-full-200 rounded">
                {searchFilter.title}
                <img onClick={e=>setSearchFilter(prev=>({...prev,title:""}))} className='cursor-pointer' src={assets.cross_icon} alt=""/>
              </span>
            )}
            {searchFilter.location && (
              <span className="inline-flex items-center gap-1 mr-4 mb-2 px-4 py-1.5 bg-blue-50 border-full-200 rounded">
                {searchFilter.location}
                 <img onClick={e=>setSearchFilter(prev=>({...prev,location:""}))} className='cursor-pointer' src={assets.cross_icon} alt=""/>
                 
              </span>
            )}
          </div>
        </>
      )}

      <button onClick={e=>setShowFilter(prev=>!prev)} className='bg-gray-100 px-4 py-2 rounded-lg mb-4 w-full lg:hidden flex justify-between items-center'>
        {showFilter?"close":"Filter Jobs"}
        </button>
       {/* category filter */}
    
        <div className={showFilter?"":'max-lg:hidden'}>
            <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
            <ul className='space-y-4 text-grey-600'>
                {
                    JobCategories.map((category,index)=>(
                        <li key={index} className='text-gray-600 cursor-pointer hover:text-purple-800 my-2 flex items-center gap-2'>
                        <input className="scale-125"type="checkbox" onChange={()=>handleCategoryChange(category)}
                        checked={selectedCategories.includes(category)}/>
                        {category}
                         </li>
                    )) 
                }
            </ul>
        </div>
        {/* locationfilter */}
    
        <div className={showFilter?"":'max-lg:hidden'}>
            <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
            <ul className='space-y-4 text-grey-600'>
                {
                    JobLocations.map((location,index)=>(
                        <li key={index} className='text-gray-600 cursor-pointer hover:text-purple-800 my-2 flex items-center gap-2'>
                        <input className="scale-125"type="checkbox" onChange={()=>handleLocationChange(location)}
                        checked={selectedLocations.includes(location)} />
                        {location}
                         </li>
                    )) 
                }
            </ul>
        </div>
            </div>


     {/* job listing */}
      <section className='lg:w-3/4 max-lg:px-4 w-full text-grey-800 '>
        <h3 class="font-medium text-3xl py-2" id="job-list">Latest jobs</h3>
        <p class="mb-8 ">Get your desired job from top companies</p>
        <div class="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4 ">
            {filteredJobs.slice((currentPage-1)*4,currentPage*4).map((job,index)=>(
               <JobCard key={index} job={job}/>
            ))}
        </div>
        {/* Pagination */ }
        {filteredJobs.length>0 && (
          <div className='flex justify-center items-center space-x-2 mt-8'>
          <a href='#job-list'>
            <img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />
          </a>
          {Array.from({length:Math.ceil(filteredJobs.length/4)}).map((_,index)=>(
            <a key={index} href='#job-list'>
            <button onClick={e=>setCurrentPage(index+1)} className={`mx-1 px-3 py-1 rounded ${currentPage===index+1?"bg-purple-800 text-white":"bg-gray-200 text-gray-600"}`}>{index+1}</button>
          </a>
          ))}
           <a href='#job-list'>
            <img onClick={()=>setCurrentPage(Math.min(currentPage+1),Math.ceil(filteredJobs.length/4))}src={assets.right_arrow_icon} alt="" />
          </a>
        </div>)
          
          }
      
      </section>
    </div>
    
  );
};

export default JobListing;
