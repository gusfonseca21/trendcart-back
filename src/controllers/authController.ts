import { promisify } from "util";
import { NextFunction, Request, Response } from "express";
import User, { IUser, Role } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

interface AuthRequest extends Request {
  user?: IUser;
}

interface NewUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signToken = (id: string) => {
  const token = process.env.JWT_SECRET ?? "";
  return jwt.sign({ id }, token, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = catchAsync(async (req: NewUserRequest, res: Response) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id.toString());

  res.status(201).json({
    status: "success",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      photo: newUser.photo,
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
      name: user.name,
      email: user.email,
      photo: user.photo,
    };

    const token = signToken(user._id.toString());

    res.status(200).json({ status: "success", user: loggedUser, token });
  }
);

// protect é usado para vefificar se o usuário está logado
export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Checar se o token existe
    let token = undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("É preciso estar logado para realizar essa ação", 401)
      );
    }

    // Validar o token
    const secret = process.env.JWT_SECRET ?? "";
    if (!secret) {
      console.log("Segredo JWT não existe");
    }

    type Decoded = {
      id: string;
      iat: string;
    };
    //@ts-expect-error Reclamações que não sei como resolver e a aplicação funciona como deveria
    const decoded: Decoded = await promisify(jwt.verify)(token, secret);

    // Checar se o usuário ainda existe
    const user = await User.findById(decoded.id);

    if (!user)
      return next(
        new AppError("O usuário relacionado ao token não existe mais", 401)
      );

    // Checar se o usuário alterou a senha depois do token ter sido gerado
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "O usuário alterou a senha recentemente. Faça o login novamente",
          401
        )
      );
    }

    // Acessar a rota protegida
    // req.user será passado para os próximos middlewares
    req.user = user;
    next();
  }
);

// restrictTo protege com base na role
export const restrictTo = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // req.user (informações de usuário) está vindo do middleware de protect
    if (!req.user)
      return next(
        new AppError("O usuário não possui um tipo especificado", 422)
      );

    if (!roles.includes(req.user.role))
      return next(
        new AppError("Você não possui permissão para realizar esta ação", 403)
      );

    next();
  };
};
