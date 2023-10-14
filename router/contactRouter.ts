import express, { Router } from "express";
import {
  createContact,
  deleteContact,
  viewAllContact,
  viewOneContact,
} from "../controller/contactController";
const router = express.Router();
router.route("/:userID/create-contact").post(createContact);
router.route("/:userID/:contactID/").get(viewOneContact);
router.route("/view-all-contact").get(viewAllContact);
router.route("/:userID/:contactID/delete-contact").delete(deleteContact)

export default router;
