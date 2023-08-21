import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};

export const getUser = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};

export const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};
export const updateUser = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};
export const deleteUser = (req: Request, res: Response) => {
  res
    .status(500)
    .json({ status: "fail", message: "A rota ainda não foi definida" });
};
