const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outletSchema = new Schema({
  outletName: { type: String, required: [true, 'Please enter of the outlet'] },
  date: { type: Date, default: Date.now },
});

const Outlet = mongoose.model('Outlet', outletSchema);
module.exports = Outlet;
