import mongoose from "mongoose";

interface iUser {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatar?: string
  contact: {}[];
}

interface iUserData extends iUser, mongoose.Document {}

const iUserModel = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    password: { type: String },
    avatar: { type: String },
    contact: [
      {
        type: mongoose.Types.ObjectId,
        ref: "contacts",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", iUserModel);
