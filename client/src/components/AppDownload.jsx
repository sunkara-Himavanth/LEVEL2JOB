import React from 'react'
import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext';
const AppDownload = () => {
  return (
    <div className="container 2xl:px-20 mx-auto bg-purple-100 rounded-lg flex max-lg:flex-col justify-between items-center px-8 py-12 my-20">
        <div className='flex max-lg:flex-col justify-between items-center w-full gap-8 relative'>
            <div>
                <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
                <div className='flex gap-4'>
                    <a href="#" className='inline-block'>
                        <img src={assets.play_store} alt="" />
                    </a>
                    <a href="#" className='inline-block'>
                        <img src={assets.app_store} alt="" />
                    </a>
                    
                </div>
            </div>
            <img classname="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden"src={assets.app_main_img} alt="" />
        </div>
    </div>
  )
}

export default AppDownload