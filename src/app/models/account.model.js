const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  username: {
    type: String,
    minlength: 8,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  userperm: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Account', Account);