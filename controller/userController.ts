import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, userName, password, phoneNumber, avatar } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      userName,
      password: hashed,
      phoneNumber,
      avatar,
    });
    return res.status(201).json({
      message: "User Created created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while creating user",
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user?.password!);
      if (check) {
        return res.status(201).json({
          message: "You're successfully signed in",
          data: user,
        });
      } else {
        return res.status(404).json({
          message: "Account not found, oga sign up!!",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while signin in user",
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const view = await userModel.find().sort({ userName: 1 });
    return res.status(200).json({
      message: "Viewing all users",
      data: view,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while viewing all users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while deleting user",
    });
  }
};
