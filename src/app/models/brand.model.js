const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brand = new Schema({
  brand_name: {
    type: String,
    unique: true,
    required: true,
  },
  brand_slug: {
    type: String,
    unique: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Brand', Brand);