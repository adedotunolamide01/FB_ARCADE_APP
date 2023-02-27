const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const adminUserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add password'],
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'manager', 'associate'],
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Outlet',
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// method to create and return a new JWT token for the user
adminUserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  this.token = token;
  await this.save();
  return token;
};

// method to check if the entered password matches the stored password
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash the password before saving the user to the database
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
