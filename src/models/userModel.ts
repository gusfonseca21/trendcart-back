import { NextFunction } from "express";
import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError.js";

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt?: Date;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Defina um email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Defina um email válido",
    },
  },
  password: {
    type: String,
    required: [true, "Defina uma senha"],
    minlength: [4, "A senha deve possuir pelo menos quatro caracteres"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);

    next();
  } catch (err) {
    next(new AppError("Houve um erro na criptografia da senha", 500));
  }
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model<IUser, Model<IUser>>("User", userSchema);

export default User;
