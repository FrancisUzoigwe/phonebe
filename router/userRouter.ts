import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  viewAllUser,
} from "../controller/userController";
const router = express.Router();
router.route("/create-user").post(createUser);
router.route("/view-all-user").get(viewAllUser);
router.route("/:userID/delete-user").delete(deleteUser);

export default router;
