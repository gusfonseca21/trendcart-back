import { Request, Response } from "express";
import Product from "../models/productsModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find();

    res.status(200).json({ status: "success", data: products });
  }
);

export const getHeroProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find({
      hero: { $exists: true },
    }).select(
      "-price -description -images -colors -ratingsAverage -reviews -__v"
    );

    res.status(200).json({ status: "success", data: products });
  }
);
