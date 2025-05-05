const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// User schema for direct access
const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  role: String,
  password: String,
  department: String,
  position: String,
  phoneNumber: String,
  createdAt: Date,
});

const UserModel = mongoose.model('User', UserSchema);

// Direct reset of admin password
const directReset = async () => {
  try {
    // Generate a fixed hash for "admin123"
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    console.log('Generated hash for admin123:', hashedPassword);
    
    // Find the admin user
    const user = await UserModel.findOne({ email: 'admin@hmps.edu' });
    
    if (!user) {
      console.log('Admin user not found');
      process.exit(1);
    }
    
    console.log('Admin user found:', user._id);
    
    // Directly update the password field
    user.password = hashedPassword;
    await user.save();
    
    console.log('Admin password directly reset in database');
    console.log('Email: admin@hmps.edu');
    console.log('New password: admin123');
    console.log('New hash:', hashedPassword);
    
    // Verify the hash works
    const testResult = await bcrypt.compare('admin123', hashedPassword);
    console.log('Verification test with bcrypt.compare:', testResult);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run the function
directReset(); 