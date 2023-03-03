const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const AdminUser = require('../models/adminUserModel');
const asyncHandler = require('express-async-handler');

// @desc    register new user
// @route   POST /api/users

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields ');
  }

  //check if user exist-
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // @desc    Login new user
  // @route   POST /api/users/login

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    token: generateToken(User.id),
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

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // find from external user database
    const user = await User.findOne({ email });
    
//find from admin user database
    if (!user) {
      
      const adminUser = await AdminUser.findOne({ email });
      if (!adminUser) {
        return res
          .status(404)
          .json({ message: 'Incorrect email or password.' });
      } else {
        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
          return res
            .status(401)
            .json({ message: 'Incorrect email or password.' });
        } else {
          res.status(200).json({
            message: 'Admin user retrieved successfully',
            _id: adminUser.id,
            name: adminUser.name,
            email: adminUser.email,
            token: generateToken(adminUser.id),
          });
        }
      }
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: 'Incorrect email or password.' });
      } else {
        res.status(200).json({
          message: 'User retrieved successfully',
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Credentials', error });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
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

const deleteUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Failed to delete user', error });
  }
});

const getme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getme,
  updateUser,
  deleteUser,
};
