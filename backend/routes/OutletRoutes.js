const express = require('express');

const router = express.Router();

const {
  getOutlet,
  createOutlet,
  updateOutlet,
  deleteOutlet,
} = require('../controllers/outletController');

router.route('/').get(getOutlet).post(createOutlet);
router.route('/:id').delete(deleteOutlet).put(updateOutlet);

module.exports = router;
