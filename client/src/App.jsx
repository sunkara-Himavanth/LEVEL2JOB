import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import  ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { useParams } from 'react-router-dom';
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import 'quill/dist/quill.snow.css' 
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const {showRecruiterLogin,companyToken}=useContext(AppContext)

  return (
    <div>

      {showRecruiterLogin && <RecruiterLogin/>}
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<ApplyJob/>}/>
        <Route path='/applications' element={<Applications/>}/>
       <Route path='/dashboard' element={<Dashboard/>}>
       {companyToken ? <> <Route path='add-job' element={<AddJob/>}/>
  <Route path='manage-jobs' element={<ManageJobs/>}/>
  <Route path='view-applications' element={<ViewApplications/>}/></>: null
       }
 
</Route>

      </Routes>
    </div>
  )
}

export default App