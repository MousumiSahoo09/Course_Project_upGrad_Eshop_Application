const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  manufacturer: { type: String, required: true },
  availableItems: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema); 