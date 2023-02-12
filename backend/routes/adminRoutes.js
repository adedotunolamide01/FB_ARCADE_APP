const express = require('express');

const router = express.Router();

const {
  adminRegisterUser,
  adminGetme,
  adminLoginUser,
} = require('../controllers/adminUserController');

const { protect } = require('../Middleware/authmiddleware');

router.post('/', adminRegisterUser);
router.post('/login', adminLoginUser);
router.get('/me', protect, adminGetme);

module.exports = router;
