import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
