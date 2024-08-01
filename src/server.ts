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
    try {
      await mongoose.connect(DB);
      console.log("Servidor conectado com sucesso");
    } catch(error) {
      console.log("Houve um erro ao tentar se conectar com a base de dados: ", error);
    }
  } else {
    console.log("Não há base de dados definida");
  }
})();

const port = 8080;

const server: Server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.log("REJEIÇÃO NÃO TRATADA! Desligando o servidor...");
  console.log(error);

  server.close(() => {
    process.exit(1);
  });
});
