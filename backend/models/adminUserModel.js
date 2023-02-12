const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
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
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'associate'],
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Outlet',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
