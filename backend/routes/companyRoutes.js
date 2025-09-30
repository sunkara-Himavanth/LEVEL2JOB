import express from 'express';
import { 
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplications,
  getCompanyPostedJobs,
  changeJobApplicationsStatus,
  changeVisiblity // keep same spelling if that’s in controller
} from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a company
router.post('/register',upload.single('image'), registerCompany);

// Company login 
router.post('/login', loginCompany);

// Get company data 
router.get('/company',protectCompany, getCompanyData);

// Post a job 
router.post('/post-job',protectCompany, postJob);

// Get applicants data of company
router.get('/applicants',protectCompany, getCompanyJobApplications);

// Get company job list 
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);

// Change application status
router.post('/change-status',protectCompany, changeJobApplicationsStatus);

// Change application visibility 
router.post('/change-visibility',protectCompany, changeVisiblity);

export default router;
