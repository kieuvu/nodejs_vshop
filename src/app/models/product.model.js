const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  prd_name: {
    type: String,
    required: true,
  },
  prd_price: {
    type: Number,
    default: 0,
  },
  prd_priceSaled: {
    type: Number,
    default: 0,
  },
  prd_cate: {
    type: String,
    required: true,
  },
  prd_brand: {
    type: String,
    required: true,
  },
  prd_desc: {
    type: String,
  },
  prd_id: {
    type: String,
    unique: true,
    required: true,
  },
  prd_quantity: {
    type: Number,
    default: 0,
  },
  prd_chip: {
    type: String,
  },
  prd_ram: {
    type: String,
  },
  prd_rom: {
    type: String,
  },
  prd_display: {
    type: String,
  },
  prd_os: {
    type: String,
  },
  prd_camera: {
    type: String,
  },
  prd_battery: {
    type: String,
  },
  prd_gcard: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', Product);