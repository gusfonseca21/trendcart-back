import express, { Request, Response } from "express";
import { default as usersRouter } from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Não foi possível encontrar a rota ${req.originalUrl}`,
  });
});

export default app;
