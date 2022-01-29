const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
  user: {
    type: String,
    required: true,
  },
  items: [
    {
      product_name: {
        type: String,
        required: true,
      },
      product_id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    }
  ],
  total_price: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', Cart);