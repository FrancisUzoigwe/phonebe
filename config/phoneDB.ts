import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const phoneDB = () => {
  mongoose.connect(process.env.MONGODB_STRING!).then(() => {
    console.log("Database connected successfully");
  });
};
