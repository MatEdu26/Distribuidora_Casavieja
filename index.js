/* Evaluacion Programacion Web 2 -- Entrega de API 

Alumno : Bassi, Matias Eduardo.

Titulo : Control de Stock de Productos

Descripcion : API que permite el control de stock de productos de Almacen, permitiendo:
. la carga de productos mediente el metodo POST /ingreso,
. la consulta de productos mediante el metodo GET /stock,
. la modificacion de productos mediante el metodo PUT /stock/:nombre,
. la eliminacion de productos mediante el metodo DELETE /stock/:nombre.

Este Stock es iniciado con 3 productos cargados en un array de objetos,
con los siguientes datos:
{
    nombre: "producto_ejemplo",
    precio: valor_numerico,
    stock: valor_numerico,
    id: valor_numerico
}


*/

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { MONGO_USER, MONGO_PASS } = require("./config.js");
const Product = require("./models/Product");

const uri =
  "mongodb+srv://" +
  MONGO_USER +
  ":" +
  MONGO_PASS +
  "@cluster0.wzr8ybs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

async function run() {
  try {
    // Conecta el cliente al servidor
    await client.connect();
    // Envia un ping para confirmar una conexión exitosa
    await client.db("admin").command({ ping: 1 });
    console.log("Conexion lograda con MongoDB!");
  } finally {
    // Asegura que el cliente se cerrará cuando termine/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.json());

let stock = [
  {
    nombre: "cafe",
    precio: 2000,
    stock: 10,
    id: 1,
  },
  {
    nombre: "leche",
    precio: 1900,
    stock: 50,
    id: 2,
  },
  {
    nombre: "azucar",
    precio: 1000,
    stock: 60,
    id: 3,
  },
];

app.get("/", (req, res) => {
  res.sendFile("./view/index.html");
});

async function mostrarTodo() {
    return await Product.find({timeout: 30000}).exec();
}

app.get("/productos", async (req, res) => {
  if (req.url.includes("productos")) {
    const products = await mostrarTodo();
    res.sendFile("./view/productos.html");
  } else {
    res.sendFile("./view/productos.html");
  }
});

app.get('/productos/buscar', async (req, res) => {
    const productName = req.query.name;
    const product = await Product.findOne({ name: productName }).exec();
    if (product) {
      res.render('productos', { products: [product] });
    } else {
      res.send('Producto no encontrado');
    }
});

app.post("/ingreso", (req, res) => {
  const nuevoProducto = {
    nombre: req.body.nombre || "sin_nombre",
    precio: req.body.precio || 0,
    stock: req.body.stock || 0,
    id: stock[stock.length - 1].id + 1,
  };
  stock.push(nuevoProducto);
  res.status(201).json({
    message: "Producto agregado al stock correctamente",
    producto: nuevoProducto,
  });
});

app.put("/stock/:nombre", (req, res) => {
  const nuevaInformacion = req.body;
  const producto = stock.find(
    (producto) =>
      producto.nombre.toLowerCase() === req.params.nombre.toLowerCase()
  );

  if (producto) {
    producto.nombre = nuevaInformacion.nombre;
    producto.precio = nuevaInformacion.precio;
    producto.stock = nuevaInformacion.stock;
    res.json({
      message: "Producto actualizado correctamente",
      producto,
    });
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.delete("/stock/:nombre", (req, res) => {
  const producto = stock.find(
    (producto) => producto.nombre === req.params.nombre
  );
  if (producto) {
    const index = stock.indexOf(producto);
    stock.splice(index, 1);
    res.json({
      message: "Producto eliminado correctamente",
      producto,
    });
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
