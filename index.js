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
const { MONGO_USER, MONGO_PASS, MONGO_URI } = require("./config.js");
const Product = require("./models/Product.js");
const { mostrarTodo } = require("./db.js");
const { displayProducts } = require("./public/funcion_productos.js");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", {
    root: __dirname,
  });
});

app.get("/productos", async (req, res) => {
  try {
    const productos = await mostrarTodo();
    displayProducts(productos);
    res.sendFile("./public/productos.html", {
      root: __dirname,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get("/productos/buscar", async (req, res) => {
  const productName = req.query.nombre;
  try {
    const products = await Product.find({
      nombre: { $regex: productName, $options: "i" },
    }).exec();
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar producto:", error);
    res.status(500).json({ error: "Error al buscar producto" });
  }
});

app.post("/carga", (req, res) => {
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
