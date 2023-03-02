const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSumSchema = new Schema({
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'AdminUser',
  },
  outletId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Outlet',
  },
  totalSum: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SaleSum', saleSumSchema);
