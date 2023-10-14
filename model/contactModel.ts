import mongoose from "mongoose";

interface iContact {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  category: "Business " | "Family" | "Custom" | "Social";
  user: {};
}

interface iContactData extends iContact, mongoose.Document {}

const iContactModel = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    address: { type: String },
    user: 
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    
  },
  { timestamps: true }
);

export default mongoose.model<iContactData>("contacts", iContactModel);
