const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const AdminUser = require('../models/adminUserModel');

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from the token
      const adminuser = await AdminUser.findById(decoded.id).select(
        '-password'
      );

      if (!adminuser) {
        res.status(401);
        throw new Error('Not authorized');
      }

      // set the user on the request object
      req.user = adminuser;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
module.exports = { adminProtect };
