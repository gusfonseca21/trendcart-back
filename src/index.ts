import express, { NextFunction, Request, Response } from "express";
import { default as usersRouter } from "./routes/userRoutes.js";
import { default as productsRoutes } from "./routes/productsRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.use("/users", usersRouter);

app.use("/products", productsRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(`Não foi possível encontrar a rota ${req.originalUrl}`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
