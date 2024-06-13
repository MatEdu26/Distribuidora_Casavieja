
const { mostrarTodo } = require("../db");
const { MONGO_USER, MONGO_PASS, MONGO_URI } = require("../config");
const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const searchInput = process.argv[2];
const searchButton = process.argv[3];
const productGrid = process.argv[4];
const productCard = process.argv[5];
const productImage = process.argv[6];
const productTitle = process.argv[7];
const productPrice = process.argv[8];


async function displayProducts(products) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("productos.html"); // Reemplaza con la URL de tu aplicación

    products.forEach(async (product, index) => {
      const img = await page.$(`img[src="${product.imageUrl}"]`);
      if (!img) {
        throw new Error(`No se encontró la imagen con la URL "${product.imageUrl}"`);
      }

      img.addEventListener('mouseover', async () => {
        const tooltip = await page.$(`div[title="${product.nombre}"]`);
        if (!tooltip) {
          tooltip = await page.$eval('body', (body) => {
            const tooltip = document.createElement('div');
            tooltip.textContent = `Nombre: ${product.nombre}\nPrecio: ${product.precio}\nStock: ${product.stock}`;
            tooltip.classList.add('tooltip');
            body.appendChild(tooltip);
            return tooltip;
          });
        }
        tooltip.show();
      });

      img.addEventListener('mouseout', async () => {
        const tooltip = await page.$(`div[title="${product.nombre}"]`);
        if (tooltip) {
          await tooltip.dispose();
        }
      });
    });

    await browser.close();
  } catch (error) {
    console.error('Error al mostrar productos:', error);
  }
}

module.exports = { displayProducts };
