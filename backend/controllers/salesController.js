const asyncHandler = require('express-async-handler');
const Sale = require('../models/salesModel');
const Outlet = require('../models/outletModel');
const AdminUser = require('../models/adminUserModel');
const Ticket = require('../models/ticketModel ');
const axios = require('axios');

//
const createSale = asyncHandler(async (req, res) => {
  try {
    const adminUser = await AdminUser.findById(req.user._id);

    const response = await Ticket.find({});

    // Create an array to hold the new Sale objects
    const sales = [];

    // Loop through the response data to create a new Sale object for each ticket
    for (let i = 0; i < response.length; i++) {
      const { ticketName, ticketAmount, _id } = response[i];

      console.log('body:', req.body);
      const ticketCounts = req.body.ticketCount || {};
      console.log('counts:', ticketCounts);

      const ticketCount = parseInt(ticketCounts[_id]) || 0;
      console.log('ticketcount:', ticketCount);

      const totalCost = parseInt(ticketAmount) * ticketCount;
      const outletId = adminUser.outlet._id;

      const sale = new Sale({
        ticketName,
        ticketAmount,
        ticketCount: ticketCount,
        ticketId: _id,
        totalCost,
        adminUser: adminUser._id,
        outletId,
      });

      await sale.save();
      sales.push(sale);
      console.log('Sales:', sale);
    }
    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // // Get a single sale record by ID
// // const getSale = async (req, res) => {
// //   try {
// //     const sale = await Sale.findById(req.params.id);
// //     if (!sale) {
// //       return res.status(404).json({ message: 'Sale record not found' });
// //     }
// //     res.json(sale);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

//Get all sale records By ID user
const getSales = asyncHandler(async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user._id);

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
