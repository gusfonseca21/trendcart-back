import app from "./index.js";
import mongoose from "mongoose";
import { Server } from "http";
import "dotenv/config";

process.on("uncaughtException", (err: Error) => {
  console.log("EXCEÇÃO NÃO TRATADA! Desligando o servidor...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

const DB = process.env.DATABASE;

void (async () => {
  if (DB) {
    await mongoose.connect(DB);
    console.log("Servidor conectado com sucesso");
  } else {
    console.log("Não há base de dados definida");
  }
})();

const port = 8080;

const server: Server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("REJEIÇÃO NÃO TRATADA! Desligando o servidor...");
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
