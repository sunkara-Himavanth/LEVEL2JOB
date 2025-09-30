import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Company from "../models/Company.js"; // make sure this path is correct

// Middleware for normal users
export const protectUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decoded.id };
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Middleware for company accounts
export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { companyId: decoded.id }; // use companyId instead of userId
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
