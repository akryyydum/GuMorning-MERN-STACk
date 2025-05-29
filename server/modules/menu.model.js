const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  photo: String,
  category: { type: String, required: true }, // Added category
  // weight: Number, // Uncomment if you want to support weight
  // Note: Store only permanent URLs for 'photo'
});

module.exports = mongoose.model('Menu', menuSchema);
