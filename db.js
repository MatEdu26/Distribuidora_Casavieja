const { MongoClient } = require("mongodb");
const { MONGO_USER, MONGO_PASS } = require("./config.js");
const Product = require('./models/Product');

const uri =
  "mongodb+srv://" +
  MONGO_USER +
  ":" +
  MONGO_PASS +
  "@cluster0.wzr8ybs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const database = client.db("db");
const productos = database.collection("productos");

async function mostrarTodo() {
  return await productos.find({}).toArray();
}

async function buscar(nome) {
  return await productos.findOne({ nombre: nombre });
}

async function insertar(producto) {
  await productos.insertOne(producto);
}

async function actualizar(nome, idade) {
  await pessoas.updateOne({ nome: nome }, { $set: { idade: idade } });
}

async function eliminar(nombre) {
  await productos.deleteOne({ nome: nome });
}

module.exports = { mostrarTodo, buscar, insertar, actualizar, eliminar };
