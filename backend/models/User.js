import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Clerk userId
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String, default: "" },
  image: { type: String, default: "https://default-avatar.png" } // fallback image
});

const User = mongoose.model("User", userSchema);
export default User;
