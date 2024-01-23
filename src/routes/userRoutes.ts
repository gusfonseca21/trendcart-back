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
  forgotPassword,
  resetPassword,
  validateResetToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

router.get("/validate-reset-token/:token", validateResetToken);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

router
  .route("/:id")
  .get(getUser)
  .put(protect, restrictTo("admin"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

export default router;
