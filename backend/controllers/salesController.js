const asyncHandler = require('express-async-handler');
const Sale = require('../models/salesModel');
const Outlet = require('../models/outletModel');
const User = require('../models/userModel');

// Create a new sale record
const createSale = asyncHandler(async (req, res) => {
  try {
    const sales = new Sale({
      user: req.user.id,
      outlet: req.user.outlet,
      amount: req.body.amount,
      date: req.body.date,
    });
    await sales.save();
    res.json({ message: 'Sale record added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    // res.status(500).json({ message: ' error us for' });
  }
});

// Get all sale records By ID user
const getSales = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const outletId = user.outlet;
    const sales = await Sale.find({ outlet: outletId });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get a single sale record by ID
// const getSale = async (req, res) => {
//   try {
//     const sale = await Sale.findById(req.params.id);
//     if (!sale) {
//       return res.status(404).json({ message: 'Sale record not found' });
//     }
//     res.json(sale);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Update a sale record by ID
const updateSale = asyncHandler(async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sale) {
      return res.status(404).json({ message: 'Sale record not found' });
    }
    res.json({ message: 'Sale record updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a sale record by ID
const deleteSale = asyncHandler(async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale record not found' });
    }
    res.json({ message: 'Sale record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getSales,
  createSale,
  updateSale,
  deleteSale,
};
