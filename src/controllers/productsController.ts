import { Request, Response } from "express";
import Product from "../models/productsModel.js";
import catchAsync from "../utils/catchAsync.js";

export const heroProducts = catchAsync(async (req: Request, res: Response) => {
  const heroProducts = await Product.find({
    bannerImage: { $exists: true },
  }).select("-price -description -images -colors -ratingsAverage -reviews");

  res.status(200).json({ status: "success", data: heroProducts });
});
