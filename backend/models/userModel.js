// backend/models/userModel.js - COMPLETE AND UPDATED

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    // This is the new optional field
    phone: {
      type: String,
      required: false, 
    },
  },
  {
    timestamps: true,
  }
);

// This method compares the entered password to the hashed one in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// This middleware runs before saving to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;