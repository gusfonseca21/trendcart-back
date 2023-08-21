import app from "./index.js";
import mongoose from "mongoose";
import "dotenv/config";

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log("Conectado com a base de dados"))
  .catch((err) => console.log(err));

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
