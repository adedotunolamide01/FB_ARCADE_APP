const Ticket = require('../models/ticketModel ');

// Create a new ticket record
const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      ticketName: req.body.ticketName,
      ticketAmount: req.body.ticketAmount,
      date: req.body.date,
    });
    await ticket.save();
    res.json({ message: 'ticket record added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ticket records
const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single sale record by ID
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
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: 'ticket record not found' });
    }
    res.json({ message: 'ticket record updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a sale record by ID
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'ticket record not found' });
    }
    res.json({ message: 'ticket record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
