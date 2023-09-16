import express from "express";
import {
  getAllProducts,
  getHeroProducts,
  getProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/hero", getHeroProducts);

router.get("/:id", getProduct);

export default router;
