const express = require('express');

const router = express.Router();

const {
  getOutlet,
  createOutlet,
  updateOutlet,
  deleteOutlet,
} = require('../controllers/outletController');
const { protect } = require('../Middleware/authmiddleware');

router.route('/').get(protect, getOutlet).post(protect, createOutlet);
router.route('/:id').delete(protect, deleteOutlet).put(protect, updateOutlet);

module.exports = router;
