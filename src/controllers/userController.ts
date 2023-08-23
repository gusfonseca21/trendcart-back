import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-__v");

    if (!user) {
      return next(
        new AppError("Não foi encontrado um usuário com essa ID", 404)
      );
    }

    res.status(201).json({ status: "success", data: { user } });
  }
);

export const updateUser = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};

export const deleteUser = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};
