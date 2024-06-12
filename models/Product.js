const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  id: Number,
  imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);