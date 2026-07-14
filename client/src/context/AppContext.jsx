import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Automatically sanitize backendUrl if it lacks http:// or https://
  if (backendUrl && !backendUrl.startsWith("http://") && !backendUrl.startsWith("https://")) {
    backendUrl = `https://${backendUrl}`;
  }

  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // -------------------------
  // Fetch all jobs
  // -------------------------
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  // -------------------------
  // Fetch company data
  // -------------------------
  const fetchCompanyData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCompanyData(data.user);
      }
    } catch (error) {
      console.error("Error fetching company data:", error.message);
    }
  };

  // -------------------------
  // Fetch user data
  // -------------------------
  const fetchUserData = async () => {
    try {
      const userToken = localStorage.getItem("userToken"); // or getToken()
      if (!userToken) return;

      // Note: Ensure your backend router uses matching pluralization (/api/users vs /api/user)
      const res = await fetch(`${backendUrl}/api/users/user`, {
        headers: { token: userToken },
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  // -------------------------
  // On mount → fetch jobs & check localStorage for company token
  // -------------------------
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) setCompanyToken(storedCompanyToken);
  }, []);

  // -------------------------
  // Fetch company data if token exists
  // -------------------------
  useEffect(() => {
    if (companyToken) fetchCompanyData();
  }, [companyToken]);

  // -------------------------
  // Fetch user data when user changes
  // -------------------------
  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [user]);

  // -------------------------
  // Context value
  // -------------------------
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
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchUserData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
