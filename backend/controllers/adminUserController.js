const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/adminUserModel');
const asyncHandler = require('express-async-handler');

// @desc    register new user
// @route   POST /api/users

const adminRegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, outlet } = req.body;

  if (!name || !email || !password || !role || !outlet) {
    res.status(400);
    throw new Error('Please add all fields ');
  }

  //check if user exist-
  const userExists = await AdminUser.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // @desc    Login new user
  // @route   POST /api/users/login

  const newUser = new AdminUser({
    name,
    email,
    password: hashedPassword,
    role,
    outlet,
    token: generateToken(AdminUser.id),
  });

  await newUser.save();
  res.status(201).json({ message: 'User created successfully', user: newUser });

  if (!newUser) {
    res.status(400).json({ message: 'Failed to create user' });
  } else {
    res.status(500);
    throw new Error('Invalid user data');
  }
});

const adminLoginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminUser = await AdminUser.findOne({ email });

    if (!AdminUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'User retrieved successfully',
      _id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      outlet: adminUser.outlet,
      token: generateToken(adminUser.id),
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

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  adminRegisterUser,
  adminLoginUser,
  adminGetme,
  adminUpdateUser,
  adminDeleteUser,
};
