import { Request, Response } from "express";
import User, { IUser } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { Types, Document } from "mongoose";

interface NewUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

interface NewUser extends Document<unknown, object, IUser> {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  createdAt: Date;
  _id: Types.ObjectId;
  __v?: number;
}

export const signup = catchAsync(async (req: NewUserRequest, res: Response) => {
  const newUser: NewUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
