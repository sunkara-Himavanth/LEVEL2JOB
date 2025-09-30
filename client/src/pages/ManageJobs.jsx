import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch company jobs
  const fetchCompanyJobs = async () => {
    if (!companyToken) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse()); // newest first
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl+'/api/company/change-visibility',
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === id ? { ...job, visible: data.job.visible } : job
          )
        );
        toast.success("Visibility updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCompanyJobs();
  }, [companyToken]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-center">Applications</th>
              <th className="py-2 px-4 text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={job._id} className="text-gray-700">
                  <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                  <td className="py-2 px-4 border-b">{job.applicants || 0}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      className="scale-125 ml-4 cursor-pointer"
                      checked={job.visible}
                      onChange={() => changeJobVisibility(job._id, !job.visible)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
