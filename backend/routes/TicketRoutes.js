const express = require('express');

const router = express.Router();

const {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');
const { protect } = require('../Middleware/authmiddleware');

router.route('/').get(protect, getTicket).post(protect, createTicket);
router.route('/:id').delete(protect, deleteTicket).post(protect, updateTicket);

module.exports = router;
