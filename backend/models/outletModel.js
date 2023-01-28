const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletSchema = new Schema({
  outlet: { type: String, required: [true, 'Please enter of the outlet'] },
  outletid: { type: String, required: [true, 'Please enter of the outlet ID'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Outlet', outletSchema);
