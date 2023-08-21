import { Request, Response } from "express";
import User from "../models/userModel.js";
import { Error } from "mongoose";

export const signup = (req: Request, res: Response) => {
  User.create(req.body)
    .then((newUser) => {
      console.log(newUser);
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    })
    .catch((error: Error.ValidationError) => {
      console.log(error.errors);
    });
};
