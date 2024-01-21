import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  login,
  signup,
  protect,
  restrictTo,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

router
  .route("/:id")
  .get(getUser)
  .put(protect, restrictTo("admin"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

export default router;
