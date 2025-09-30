import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from'react-router-dom'
import { useContext } from 'react'

import { AppContext } from '../context/AppContext'
const Dashboard = () => {
    const navigate = useNavigate()
    const {companyData,setCompanyData,setCompanyToken}=useContext(AppContext)
  //function to logout for company
  const logout=()=>{
    setCompanyData(null)
    setCompanyToken(null)
    localStorage.removeItem("companyToken")
    navigate('/')
  }

  useEffect(() => {
    if(companyData){
        navigate('/dashboard/manage-jobs')
    }
  }, [companyData])


  return (
    <div className='min-h-screen'>
       {/*Navabar for recruiter panel*/}
       <div className='shadow py-4'>
          <div className='px-5 flex justify-between items-center'>
            <img onClick={e=>navigate('/')} className='max-sm:w-32 cursor-pointer'src={assets.logo} alt='Logo' />
            {companyData && (
                  <div className='flex items-center gap-3'>
              <p className='max-sm:hidden '>Welcome, {companyData.name}</p>
              <div className='realtive group'>
                <img className='w-8 border rounded-full' src={companyData.image} alt='Company Logo' />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                        <li onClick={logout} className='px-2 py-1 cursor-pointer pr-10'>
                            Logout
                        </li>
                    </ul>
                </div>
              </div>
              
            </div>

            )}
            
          
          </div>

       </div>

       <div className='flex flex-start'>
        {/*left sidebar for recruiter panel option to add job,manage job,view job*/}
          
          <div className='inline-block min-h-screen border-r-2'>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
                <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'  }`} to={'/dashboard/add-job'} >
                   <img className='min-w-4' src={assets.add_icon} alt='' />
                   <p className='max-sm:hidden'>Add Job</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'  }`}  to={'/dashboard/manage-jobs'}>
                   <img className='min-w-4' src={assets.home_icon} alt='' />
                   <p className='max-sm:hidden'>Manage Jobs</p>
                </NavLink>
                <NavLink to={'/dashboard/view-applications'} className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'  }`}>
                   <img className='min-w-4' src={assets.person_tick_icon} alt='' />
                   <p className='max-sm:hidden'> View Applications</p>
                </NavLink>
            </ul>
          </div>

          <div>
            {/*Outlet for the content of the page*/}
            <Outlet />
          </div>
       </div>
    </div>
  )
}

export default Dashboard
