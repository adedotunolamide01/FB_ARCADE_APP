const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Outlet',
  },
  amount: { type: Number, required: true },

  date: { type: Date, default: Date.now },

  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  ticketCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Sale', saleSchema);
