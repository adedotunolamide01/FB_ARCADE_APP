const express = require('express');

const router = express.Router();

const { protect } = require('../Middleware/authmiddleware');

const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} = require('../controllers/salesController');

router.route('/').get(protect, getSales).post(protect, createSale);
router.route('/:id').delete(protect, deleteSale).put(protect, updateSale);

module.exports = router;
