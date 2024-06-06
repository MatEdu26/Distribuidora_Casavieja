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

const express = require('express');
const app = express();
const mo
const port = 3000;

app.use(express.json());


let stock = [
    {
        nombre: "cafe",
        precio: 2000,
        stock: 10,
        id: 1
    },
    {
        nombre: "leche",
        precio: 1900,
        stock: 50,
        id: 2
    },
    {
        nombre: "azucar",
        precio: 1000,
        stock: 60,
        id: 3
    }
];

app.get('/', (req, res) => {
    res.sendFile("./view/index.html", {
        root: __dirname,
    })
});

app.get('/productos', (req, res) => {
    res.sendFile("./view/productos.html", {
      root: __dirname,
    });
});

app.post("/ingreso", (req, res) => {
    const nuevoProducto = {
        nombre: req.body.nombre || "sin_nombre",
        precio: req.body.precio || 0,
        stock: req.body.stock || 0,
        id: stock[stock.length - 1].id + 1
    };
    stock.push(nuevoProducto);
    res.status(201).json({
        message: "Producto agregado al stock correctamente",
        producto: nuevoProducto
    });
});

app.put("/stock/:nombre", (req, res) => {
    const nuevaInformacion = req.body;
    const producto = stock.find(producto => producto.nombre.toLowerCase() === req.params.nombre.toLowerCase());

    if (producto) {
        producto.nombre = nuevaInformacion.nombre;
        producto.precio = nuevaInformacion.precio;
        producto.stock = nuevaInformacion.stock;
        res.json({
            message: "Producto actualizado correctamente",
            producto
        });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});

app.delete("/stock/:nombre", (req, res) => {
    const producto = stock.find(producto => producto.nombre === req.params.nombre);
    if (producto) {
        const index = stock.indexOf(producto);
        stock.splice(index, 1);
        res.json({
            message: "Producto eliminado correctamente",
            producto
        });
    } else {
        res.status(404).send("Producto no encontrado");
    }
});


app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});