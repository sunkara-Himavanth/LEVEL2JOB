import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "job-portal",
    });
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ Database disconnected");
  });
};

export default connectDB;
