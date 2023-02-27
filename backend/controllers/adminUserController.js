const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/adminUserModel');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv').config();

// @desc    register new user
// @route   POST /api/adminusers

const adminRegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, outlet } = req.body;

  if (!name || !email || !password || !role || !outlet) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  try {
    //check if user exist-
    const userExists = await AdminUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await AdminUser.create({
      name,
      email,
      password,
      role,
      outlet,
    });
    const token = await user.generateAuthToken();
    // Save user to database
    //await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        outlet: user.outlet,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Invalid user data' });
  }
});

const adminLoginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Email:', email);

    const user = await AdminUser.findOne({ email });
    console.log('User:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      outlet: user.outlet,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Invalid Credentials', error });
  }
});

const adminUpdateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await AdminUser.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(404).json({ message: 'Failed to update user', error });
  }
});

const adminDeleteUser = asyncHandler(async (req, res) => {
  try {
    await AdminUser.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Failed to delete user', error });
  }
});

const adminGetme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

module.exports = {
  adminRegisterUser,
  adminLoginUser,
  adminGetme,
  adminUpdateUser,
  adminDeleteUser,
};
