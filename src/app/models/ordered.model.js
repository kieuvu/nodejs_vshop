const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ordered = new Schema({
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
  info: {
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: Number,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    customer_note: {
      type: String,
    }
  },
  stage: {
    type: Number,
    default: 0 // 0: recent - 1: confirmed  - 2: completed
  },
  total_price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Ordered', Ordered);