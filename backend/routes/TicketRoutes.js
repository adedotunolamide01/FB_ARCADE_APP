const express = require('express');

const router = express.Router();

const {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

router.route('/').get(getTicket).post(createTicket);
router.route('/:id').delete(deleteTicket).post(updateTicket);

module.exports = router;
