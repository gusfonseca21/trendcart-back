import { Request, Response } from "express";
import Product from "../models/productsModel.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    let products = [];

    const ignoredFields =
      "-category -description -hero -ratingsAverage -reviews";

    const filter = req.query.filter;

    const page = Number(req.query.page) * 1 || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    let numProducts: number = 0;

    if (filter === "Todos") {
      products = await Product.find()
        .select(ignoredFields)
        .skip(skip)
        .limit(limit);
      numProducts = await Product.countDocuments();
    } else {
      products = await Product.find({ category: filter })
        .select(ignoredFields)
        .skip(skip)
        .limit(limit);

      numProducts = await Product.find({ category: filter }).countDocuments();
    }

    res.status(200).json({
      status: "success",
      data: products,
      isLastPage: skip + limit >= numProducts,
    });
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
