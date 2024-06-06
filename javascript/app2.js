// Obtener referencia al formulario
const productForm = document.getElementById('productForm');

// Agregar evento de envío del formulario
productForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de los campos
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const stock = parseInt(document.getElementById('stock').value);
  const imageUrl = document.getElementById('imageUrl').value || 'https://via.placeholder.com/150'; // Usar URL de imagen predeterminada si está vacía

  // Validar los datos
  if (!name || !price || !stock) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  // Crear un objeto con los datos del producto
  const newProduct = {
    name,
    price,
    stock,
    imageUrl
  };

  // Aquí debes agregar la lógica para guardar el producto en la base de datos
  console.log('Producto guardado:', newProduct);

  // Limpiar el formulario
  productForm.reset();
});