const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
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
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },

  ticketName: {
    type: String,
    required: true,
  },
  ticketAmount: {
    type: Number,
    required: true,
  },
  ticketCount: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sale', saleSchema);
