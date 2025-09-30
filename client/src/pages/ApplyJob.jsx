import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { assets } from "../assets/assets";
import kConvert from "k-convert";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs, backendUrl, userData, userApplications } = useContext(AppContext);

  // ✅ Fetch job
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Apply job
  const applyHandler = async () => {
    try {
      if (!userData) return toast.error("Please login to apply");
      if (!userData.resume) return toast.error("Please upload resume in profile to apply");
      if (!userData.token) return toast.error("Session expired. Please login again");

      if (userApplications?.some((app) => app.jobId === id)) {
        return toast.info("You have already applied to this job");
      }

      const { data } = await axios.post(
        `${backendUrl}/api/jobs/apply-job`,
        { jobId: id },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`, // ✅ fixed
          },
        }
      );

      if (data.success) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!jobData) return <Loading />;

  return (
    <>
      <Navbar />

      <div className="min-h-screen py-10 container 2xl:px-20 mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <div className="bg-white p-8 rounded-lg w-full text-black">
          {/* Job Header */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                className="h-17 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={jobData?.companyId?.image || assets.default_company}
                alt={jobData?.companyId?.name || "Company"}
              />
              <div className="text-center md:text-left text-neutral-800">
                <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center items-center gap-6 gap-y-2 mt-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData?.companyId?.name || "Company Name"}
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

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center gap-4">
              <button onClick={applyHandler} className="bg-blue-600 text-white px-6 py-3 rounded">
                Apply Now
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Description & More Jobs */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            {/* Job Description */}
            <div className="w-full lg:w-2/3 text-black">
              <h2 className="text-2xl font-semibold mb-6">Job Description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
              <button
                onClick={applyHandler}
                className="bg-blue-600 text-white px-6 py-3 rounded mt-6"
              >
                Apply Now
              </button>
            </div>

            {/* More Jobs from Same Company */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded text-black mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="text-2xl font-semibold mb-6">
                More jobs from {jobData.companyId?.name || "Company"}
              </h2>
              {jobs
                .filter(
                  (job) =>
                    (job.companyId?._id || job.companyId) === (jobData.companyId?._id || jobData.companyId) &&
                    job._id !== jobData._id
                )
                .slice(0, 3)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ApplyJob;
