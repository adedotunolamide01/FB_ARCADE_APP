const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
