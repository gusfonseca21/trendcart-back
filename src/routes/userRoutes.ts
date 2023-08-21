import express, { NextFunction, Request, Response } from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.param(
  "id",
  (req: Request, res: Response, next: NextFunction, val: string) => {
    console.log(`O id é ${val}`);
    next();
  }
);

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
