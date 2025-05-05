const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Test the exact admin password we'll use for login
const checkAdminPassword = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ email: 'admin@hmps.edu' }).select('+password');
    
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }
    
    console.log('Admin user found:');
    console.log('- ID:', admin._id);
    console.log('- Email:', admin.email);
    console.log('- Role:', admin.role);
    console.log('- Password hash (first 20 chars):', admin.password.substring(0, 20) + '...');
    
    // Test the password we expect to work
    const testPassword = 'admin123';
    console.log('\nTesting password:', testPassword);
    
    const isMatch = await admin.matchPassword(testPassword);
    console.log('Password match result:', isMatch);
    
    if (isMatch) {
      console.log('\n✅ SUCCESS: "admin123" is the correct password for admin@hmps.edu');
    } else {
      console.log('\n❌ FAILURE: "admin123" is NOT the correct password for admin@hmps.edu');
      console.log('Please reset the admin password using reset-admin.js');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the function
checkAdminPassword(); 