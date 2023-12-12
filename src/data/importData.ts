import "dotenv/config";
import Product from "../models/productsModel.js";
import mongoose from "mongoose";
import products from "./products.js";

const DB = process.env.DATABASE;

void (async () => {
  if (DB) {
    await mongoose.connect(DB);
    console.log("Servidor conectado com sucesso");
  } else console.log("Base de dados não definida");
})();

// IMPORTAR DADOS NA DB
async function importData() {
  try {
    await Product.create(products);
    console.log("Dados importados com sucesso");
  } catch (err) {
    console.log(err);
  }
}

// DELETAR DADOS DA DB
async function deleteData() {
  try {
    await Product.deleteMany();
    console.log("Os dados foram deletados com sucesso");
  } catch (err) {
    console.log(err);
  }
}

const commandArgument = process.argv[2];

if (commandArgument === "--import") {
  await importData();
  process.exit();
} else if (commandArgument === "--delete") {
  await deleteData();
  process.exit();
}
