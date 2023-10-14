import { Request, Response } from "express";
import userModel from "../model/userModel";
import contactModel from "../model/contactModel";

export const createContact = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { name, email, phoneNumber, address, category } = req.body;
    const user = await userModel.findById(userID);
    if (user) {
      const create = await contactModel.create({
        name,
        email,
        phoneNumber,
        address,
        category,
      });
      user?.contact.push(create?._id);
      user?.save();
      return res.status(201).json({
        message: "Contact created successfully",
        data: create,
      });
    } else {
      return res.status(404).json({
        message: "Unable to create contact",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while creating contact",
      info: error.message,
      error,
    });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { userID, contactID } = req.params;
    const user: any = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({
        message: "Unable to delete to delete contact",
      });
    } else {
      const contacts = await contactModel.findByIdAndDelete(contactID);
      user?.contact?.pull(contacts?._id);
      user?.save();
      return res.status(201).json({
        message: "Contact deleted successfully",
        data: contacts,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while deleting contact",
    });
  }
};

export const viewOneContact = async (req: Request, res: Response) => {
  try {
    const { userID, contactID } = req.params;
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(400).json({
        message: "Unable to view this contact details",
      });
    } else {
      const contact = await contactModel.findById(contactID);
      return res.status(200).json({
        message: `${contact?.name}details is your requested contact details`,
        data: contact,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while viewing one contact",
      info: error.message,
      error,
    });
  }
};

export const viewAllContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactModel.find();
    return res.status(200).json({
      message: "Viewing all contacts",
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while viewing all contact",
    });
  }
};
