const { mostrarTodo, buscar } = require("../db");
const { MONGO_USER, MONGO_PASS, MONGO_URI } = require("../config");

const searchInput = process.argv[2];
const searchButton = process.argv[3];
const productGrid = process.argv[4];

if (!searchInput || !searchButton || !productGrid) {
  console.error("Debes proporcionar los argumentos necesarios");
  process.exit(1);
}

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.toLowerCase();
  try {
    const productos = await mostrarTodo();
    const filteredProducts = productos.filter((product) => {
      return product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Actualizar la vista con los resultados
    displayProducts(filteredProducts);
    console.log(`Buscando productos que contengan "${searchTerm}"`);
  } catch (error) {
    console.error('Error al filtrar productos:', error);
  }
});

async function displayProducts(products) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(MONGO_URI); // Reemplaza con la URL de tu aplicación

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
