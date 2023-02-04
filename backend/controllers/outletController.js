const Outlet = require('../models/outletModel');

// Create a new ticket record
const createOutlet = async (req, res) => {
  try {
    const outlet = new Outlet({
      outletName: req.body.outletName,
      date: req.body.date,
    });
    await outlet.save();
    res.json({ message: 'outlet record added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ticket records
const getOutlet = async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// //Get a single sale record by ID

// const getTickect = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     if (!ticket) {
//       return res.status(404).json({ message: 'ticket record not found' });
//     }
//     res.json(ticket);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Update a sale record by ID
const updateOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!outlet) {
      return res.status(404).json({ message: 'outlet record not found' });
    }
    res.json({ message: 'outlet record updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a sale record by ID
const deleteOutlet = async (req, res) => {
  try {
    const outlet = await Outlet.findByIdAndDelete(req.params.id);
    if (!outlet) {
      return res.status(404).json({ message: 'outlet record not found' });
    }
    res.json({ message: 'outlet record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getOutlet,
  createOutlet,
  updateOutlet,
  deleteOutlet,
};
