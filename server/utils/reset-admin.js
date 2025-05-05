const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Reset admin password
const resetAdminPassword = async () => {
  try {
    // Find admin user
    const admin = await User.findOne({ email: 'admin@hmps.edu' });
    
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('Admin password reset successfully');
    console.log('Email: admin@hmps.edu');
    console.log('New password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the function
resetAdminPassword(); 