const express = require('express');

const router = express.Router();

const { adminProtect } = require('../Middleware/adminauthmiddleware');

const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} = require('../controllers/salesController');

router.route('/').get(adminProtect, getSales).post(adminProtect, createSale);
router
  .route('/:id')
  .delete(adminProtect, deleteSale)
  .put(adminProtect, updateSale);

module.exports = router;
