import cloudinary from "../config/cloudinary.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

// ==========================
// Get User Data
// ==========================
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==========================
// Apply for Job
// ==========================
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    // Check if already applied
    const alreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (alreadyApplied)
      return res.json({ success: false, message: "Already applied" });

    // Get job data
    const job = await Job.findById(jobId);
    if (!job) return res.json({ success: false, message: "Job not found" });

    // Create application
    await JobApplication.create({
      jobId,
      userId,
      companyId: job.companyId,
    });

    res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==========================
// Get User Job Applications
// ==========================
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const applications = await JobApplication.find({ userId })
      .populate("jobId", "title description location category level salary")
      .populate("companyId", "name email image")
      .exec();

    if (!applications.length)
      return res.json({ success: false, message: "No applications found" });

    res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ==========================
// Update User Resume
// ==========================
export const updateUserResume = async (req, res) => {
  const userId = req.auth.userId;
  const resumeFile = req.file; // assuming multer middleware

  try {
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (resumeFile) {
      const uploadResult = await cloudinary.uploader.upload(resumeFile.path);
      user.resume = uploadResult.secure_url;
    }

    await user.save();
    res.json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
