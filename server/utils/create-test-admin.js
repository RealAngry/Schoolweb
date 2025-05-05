const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create a test admin user
const createTestAdmin = async () => {
  try {
    // Check if test admin already exists
    const existingUser = await User.findOne({ email: 'test@admin.com' });
    
    if (existingUser) {
      console.log('Test admin user already exists');
      process.exit(0);
    }
    
    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);
    
    // Create user with manual hash
    const user = new User({
      displayName: 'Test Admin',
      email: 'test@admin.com',
      password: hashedPassword, // Using pre-hashed password
      role: 'admin',
      department: 'Administration',
      position: 'School Administrator',
      createdAt: new Date()
    });
    
    // Save without triggering the pre-save hook
    // This is done by setting a flag that we'll check in the hook
    user._skipPasswordHashing = true;
    await user.save();
    
    console.log('Test admin user created successfully:');
    console.log('Email: test@admin.com');
    console.log('Password: test123');
    
    // Test the password
    const isMatch = await bcrypt.compare('test123', user.password);
    console.log('Password test result:', isMatch ? 'PASSED' : 'FAILED');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the function
createTestAdmin(); 