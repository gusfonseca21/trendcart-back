import { promisify } from "util";
import { NextFunction, Request, Response } from "express";
import User, { IUser, Role } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import { sendEmail } from "../utils/email.js";
import hashToken from "../utils/hashToken.js";

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

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface ForgotRequest extends Request {
  body: {
    email: string;
  };
}

interface ResetRequest extends Request {
  body: {
    password: string;
    passwordConfirm: string;
  };
}

interface ValidateResetTokenRequest extends Request {
  body: {
    token: string;
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
  async (req: LoginRequest, res: Response, next: NextFunction) => {
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

export const forgotPassword = catchAsync(
  async (req: ForgotRequest, res: Response, next: NextFunction) => {
    // Retornar os dados do usuário baseado no email do POST

    if (!req.body?.email) {
      return next(new AppError("É preciso definir um email", 403));
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError("Não existe um usuário com este e-mail", 404));
    }

    // Gerar token de reset aleatório
    const resetToken = user.createPasswordResetToken();
    // validateBeforeSave false irá desabilitar todos os validadores que especificamos durante essa ação
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${
      process.env.NODE_ENV === "development" ? "localhost:3000" : ""
    }/forgot-password/${resetToken}`;

    if (process.env.NODE_ENV === "development") {
      console.log("EM PRODUÇÃO ALTERAR O LINK DO PASSWORD RESET");
    }

    const message = `Esqueceu sua senha? Faça a alteração no seguinte link: ${resetURL}.\nSe você não esqueceu sua senha, ignore este e-mail.`;

    try {
      await sendEmail({
        email: req.body.email,
        subject: "Token de mudança de senha (Valido por 10 min.)",
        message,
      });

      res
        .status(200)
        .json({ status: "success", message: "Token enviado para o e-mail" });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "Houve um erro ao enviar o e-mail. Tente novamente mais tarde.",
          500
        )
      );
    }
  }
);

export const resetPassword = catchAsync(
  async (req: ResetRequest, res: Response, next: NextFunction) => {
    // Retornar o usuário com base no token
    const hashedToken = hashToken(req.params.token);

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Validar o token e o usuário

    if (!user) {
      return next(new AppError("O token é inválido ou expirou", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Logar o usuário
    const token = signToken(user._id.toString());

    res.status(200).json({
      status: "success",
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    });
  }
);

export const validateResetToken = catchAsync(
  async (req: ValidateResetTokenRequest, res: Response, next: NextFunction) => {
    const hashedToken = hashToken(req.params.token);

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("O token é inválido ou expirou", 401));
    } else {
      res.status(200).json({ status: "success" });
    }
  }
);
