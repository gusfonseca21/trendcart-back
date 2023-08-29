import express from "express";
import { heroProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get("/hero", heroProducts);

export default router;
