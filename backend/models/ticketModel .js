const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  ticketName: { type: String, required: [true, 'Please name of the ticket'] },
  ticketAmount: {
    type: Number,
    required: [true, 'Please add the ticket amount value '],
  },
  date: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
