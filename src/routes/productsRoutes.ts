import express from "express";
import {
  getAllProducts,
  getHeroProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/hero", getHeroProducts);

export default router;
