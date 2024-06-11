const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    url: String
  });

  module.exports = mongoose.model('Product', productSchema);