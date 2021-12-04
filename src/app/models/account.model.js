const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  username: {
    type: String,
    minlength: 8,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  userperm: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Account', Account);