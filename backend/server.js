import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ✅ Debug env
console.log("CLERK_PUBLISHABLE_KEY:", process.env.CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

// Connect to database & Cloudinary
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors());

// ✅ Clerk Webhooks (must use raw body BEFORE express.json())
app.post(
  "/webhooks",
  clerkWebhooks
);

// Normal JSON parsing for all other routes
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error");
});

// ✅ Normal routes (no Clerk)
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", clerkMiddleware(), userRoutes);

// ✅ Protected routes (Clerk required)
app.use("/api/protected", clerkMiddleware(), (req, res) => {
  res.json({ message: "You accessed a protected route!", user: req.auth });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all handler: send back React's index.html file for any non-API routes
// Catch all handler: send back React's index.html file for any non-API routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// Export app for Vercel deployment
export default app;

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
