import { Model, Schema, model, ObjectId, SchemaType } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import AppError from "../utils/appError.js";
import hashToken from "../utils/hashToken.js";

export type Role = "user" | "admin";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  photo: string | null;
  role: Role;
  createdAt?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestap: string) => boolean;
  createPasswordResetToken: () => string;
  cart: {
    productId: string;
    quantity: number;
  }[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Defina um nome"],
    minLength: [4, "O nome precisa ter mais de 3 caracteres"],
    maxlength: [15, "O nome não pode ter mais de 15 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Defina um email"],
    unique: true,
    lowercase: true,
    // Validators funcionam somente nos métodos CREATE e SAVE do mongoose
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
  passwordConfirm: {
    type: String,
    required: [true, "Confirme a senha"],
    validate: {
      // Aqui não podemos usar uma arrow function pois utilizaremos o this
      validator: function (this: IUser, el: string): boolean {
        return el === this.password;
      },
      message: "As senhas não são iguais",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  photo: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  cart: [
    {
      productId: {
        type: String,
        required: [true, "É necessário definir o id do produto como string"],
      },
      quantity: {
        type: Number,
        required: [true, "É preciso definir uma quantidade"],
        min: 1,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    // passwordConfirm serve apenas para validar as senhas inseridas na hora da criação
    this.passwordConfirm = undefined;
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

userSchema.methods.changedPasswordAfter = function (
  this: IUser,
  JWTTimestamp: number
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False = senha não foi alterada
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = hashToken(resetToken);

  this.passwordResetExpires = Date.now() + 20 * 60 * 1000;

  return resetToken;
};

// Middleware para atualizar o campo de alteração de senha
userSchema.pre("save", function (next) {
  // Ignorar esse middleware caso não estejamos alterando nossa senha
  if (!this.isModified("password") || this.isNew) return next();

  // Atualizamos o campo subtraindo 3 segundos pelo tempo de salvamento no banco não impedir a autenticação do token
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

const User = model<IUser, Model<IUser>>("User", userSchema);

export default User;
