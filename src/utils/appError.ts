import { Error } from "mongoose";

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  // Caso seja um erro do MongoDB
  value?: string;
  path?: string;
  code?: number;
  errmsg?: string;
  errors?: Error.ValidationError["errors"];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
