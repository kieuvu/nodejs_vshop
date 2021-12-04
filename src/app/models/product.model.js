const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  prd_name: {
    type: String,
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
  },
  prd_brand: {
    type: String,
  },
  prd_desc: {
    type: String,
  },
  prd_id: {
    type: String,
    unique: true,
  },
  prd_quantity: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', Product);