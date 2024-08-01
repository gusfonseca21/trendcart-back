import "dotenv/config";
import Product from "../models/productsModel.js";
import mongoose from "mongoose";
import products from "./products.js";

const DB = process.env.DATABASE;

void (async () => {
  if (DB) {
    try {

      await mongoose.connect(DB);
      console.log("Servidor conectado com sucesso");
    } catch(error) {
      console.log("Houve um erro ao tentar se conectar na base de dados: ", error)
    }
  } else console.log("Base de dados não definida");
})();

// IMPORTAR DADOS NA DB
async function importData() {
  try {
    await Product.create(products);
    console.log("Dados importados com sucesso");
  } catch (error) {
    console.log("Erro na importação de dados para o banco de dados: ", error);
  }
}

// DELETAR DADOS DA DB
async function deleteData() {
  try {
    await Product.deleteMany();
    console.log("Os dados foram deletados com sucesso");
  } catch (error) {
    console.log("Erro na exclusão de dados no banco de dados: ", error);
  }
}

const commandArgument = process.argv[2];

if (commandArgument === "--import") {
  importData()
    .then(() => process.exit())
    .catch((err) => {
      console.error(err);
      process.exit(1); // Optional: Exit with a non-zero code to indicate failure
    });
} else if (commandArgument === "--delete") {
  deleteData()
    .then(() => process.exit())
    .catch((err) => {
      console.error(err);
      process.exit(1); // Optional: Exit with a non-zero code to indicate failure
    });
}
