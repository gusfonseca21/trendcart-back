import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

interface NewUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req: NewUserRequest, res: Response) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  const token = signToken(newUser._id.toString());

  res.status(201).json({
    status: "success",
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
    },
  });
});

export const login = catchAsync(
  async (req: loginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("email ou senha não foram definidos", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("email ou senha estão incorretos", 401));
    }

    const loggedUser = {
      id: user._id,
      email: user.email,
    };

    const token = signToken(user._id.toString());

    res.status(200).json({ status: "success", user: loggedUser, token });
  }
);
