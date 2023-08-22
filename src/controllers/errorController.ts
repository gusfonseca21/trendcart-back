import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";

const handleCastErrorDB = (error: AppError) => {
  return new AppError(`${error.path} inválido: ${error.value}`, 400);
};

const handleDuplicateFieldsDB = (error: AppError) => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  return new AppError(`Campo duplicado: ${value[0]}`, 400);
};

const handleValidationErrorDB = (error: AppError) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  return new AppError(`Dados inseridos inválidos. ${errors.join(". ")}`, 400);
};

const developmentError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({ status: "error", message: "Algo deu errado!" });
  }
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let newError = err;
    if (err.name === "CastError") newError = handleCastErrorDB(err);

    if (err.code === 11000) newError = handleDuplicateFieldsDB(err);

    if (err.name === "ValidationError") newError = handleValidationErrorDB(err);

    productionError(newError, res);
  }
};

export default globalErrorHandler;
