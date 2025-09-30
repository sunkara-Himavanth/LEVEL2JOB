import { createContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const {user}=useUser()
const {getToken}=useAuth()
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  // FUNCTION TO FETCH JOBS (mock data for now)
  const fetchJobs = async () => {
    try {
        const {data}=await axios.get(backendUrl+'/api/jobs')
        if(data.success){
            setJobs(data.jobs)
            console.log(data.jobs)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
    
  };

  // FUNCTION TO FETCH COMPANY DATA
  const fetchCompanyData = async () => {
    try {
        const token=await getToken()
      const {data} = await axios.get(backendUrl + "/api/users/user", {
        headers: { Authorization:`Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // On first load → fetch jobs & check localStorage for token
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

//function to fetch user data
const fetchUserData=async()=>{
  try {
    const res=await fetch(backendUrl+'/api/user/user',{
      headers:{token:userToken}
    })
    const data=await res.json();
    if(data.success){
      setUserData(data.user)
      console.log(data)
    }   else{
      toast.error(data.message)
    }   
} catch (error) {
    toast.error(error.message)
}
}

  // If token changes → fetch company data
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    if(user){
        fetchUserData()
    }   else    
    setUserData(null)
}, [user]);

  const value = {
    setIsSearched,
    searchFilter,
    isSearched,
    setSearchFilter,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,userData,setUserData,userApplications,setUserApplications,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};