const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// List all users
const listUsers = async () => {
  try {
    const users = await User.find({}).select('+password');
    
    console.log('=== USERS IN DATABASE ===');
    users.forEach(user => {
      console.log(`\nUser ID: ${user._id}`);
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.displayName}`);
      console.log(`Role: ${user.role}`);
      console.log(`Password (hashed): ${user.password}`);
      console.log('------------------------');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the function
listUsers(); 