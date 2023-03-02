const asyncHandler = require('express-async-handler');
const Sale = require('../models/salesModel');
const Outlet = require('../models/outletModel');
const AdminUser = require('../models/adminUserModel');
const Ticket = require('../models/ticketModel ');
const SaleSum = require('../models/saleSum');
const axios = require('axios');

// const createSale = asyncHandler(async (req, res) => {
//   try {
//     const adminUser = await AdminUser.findById(req.user._id);

//     // Retrieve tickets associated with the sales data
//     const ticketIds = await Promise.all(
//       req.body.sales.map((sale) => sale.ticketId)
//     );
//     const tickets = await Ticket.find({ _id: { $in: ticketIds } });
//     console.log('tickets:', tickets);

//     // Create an array to hold the new Sale objects
//     const sales = [];

//     for (let i = 0; i < req.body.sales.length; i++) {
//       const { ticketName, ticketAmount, _id } = tickets.find(
//         (ticket) => ticket._id.toString() === req.body.sales[i].ticketId
//       );
//       const ticketCount = req.body.sales[i].ticketCount || 0;
//       const totalCost = parseInt(ticketAmount) * ticketCount;
//       const outletId = adminUser.outlet._id;
//       //
//       const sale = new Sale({
//         ticketName,
//         ticketAmount,
//         ticketCount,
//         ticketId: _id,
//         totalCost,
//         adminUser: adminUser._id,
//         outletId,
//       });
//       await sale.save();
//     }
//     res.status(201).json({
//       message: 'Sales created successfully',
//       sales: sales, // Return the sales array in the response
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

const createSale = asyncHandler(async (req, res) => {
  try {
    const adminUser = await AdminUser.findById(req.user._id);
    const outletId = adminUser.outlet._id;
    // Retrieve tickets associated with the sales data
    const ticketIds = await Promise.all(
      req.body.sales.map((sale) => sale.ticketId)
    );
    const tickets = await Ticket.find({ _id: { $in: ticketIds } });

    // Create an array to hold the new Sale objects and total cost
    const sales = [];

    for (let i = 0; i < req.body.sales.length; i++) {
      const { ticketName, ticketAmount, _id } = tickets.find(
        (ticket) => ticket._id.toString() === req.body.sales[i].ticketId
      );
      const ticketCount = req.body.sales[i].ticketCount || 0;
      const totalCost = parseInt(ticketAmount) * ticketCount;

      // const sale = new Sale({
      //   ticketName,
      //   ticketAmount,
      //   ticketCount,
      //   ticketId: _id,
      //   totalCost,
      //   adminUser: adminUser._id,
      //   outletId,
      // });
      const sale = await Sale.create({
        ticketName,
        ticketAmount,
        ticketCount,
        ticketId: _id,
        totalCost,
        adminUser: adminUser._id,
        outletId,
      });

      sales.push(sale);
    }
    // await Sale.insertMany(sales);

    // Create a TotalSum
    // const totalSum = parseInt(req.body.totalCost);
    // const saleSum = await SaleSum.create({
    //   totalSum: totalSum,
    //   adminUser: adminUser._id,
    //   outletId: adminUser.outlet._id,
    // });

    // await saleSum.save();

    res.status(201).json({
      message: 'Sales created successfully',
      sales: sales,
      // saleSum: saleSum,
    });
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
