import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk user ID
    ref: "User",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Number,
    required: true,
  },
});

// Replace the existing const JobApplication = mongoose.model(...) line with this:
const JobApplication = mongoose.models.JobApplication || mongoose.model(
  "JobApplication",
  JobApplicationSchema
);


export default JobApplication;
