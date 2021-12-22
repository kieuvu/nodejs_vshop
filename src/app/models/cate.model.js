const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
  cate_name: {
    type: String,
    unique: true,
    required: true,
  },
  cate_slug: {
    type: String,
    unique: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', Category);