// Obtener referencias a los elementos HTML
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Agregar evento de clic al botón de búsqueda
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase();
  filterProductsByName(searchTerm);
});

// Función para filtrar los productos por nombre
function filterProductsByName(searchTerm) {
  // Aquí debes implementar la lógica para filtrar los productos
  // y actualizar la vista con los resultados
  console.log(`Buscando productos que contengan "${searchTerm}"`);
}




// Función para generar las miniaturas de los productos
function displayProducts(products) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  products.forEach((product, index) => {
    const col = document.createElement('div');
    col.classList.add('col-md-2', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = product.name;

    cardBody.appendChild(title);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    if ((index + 1) % 5 === 0 || index === products.length - 1) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.appendChild(col);
      productGrid.appendChild(row);
    } else {
      productGrid.appendChild(col);
    }
  });
}

Ahora, en tu código existente, debes llamar a la función displayProducts() 
con los datos de los productos que deseas mostrar. Por ejemplo, si tienes
 una función getProducts() que devuelve un array de productos, puedes llamar
  a displayProducts(getProducts()) para mostrar los productos en la página