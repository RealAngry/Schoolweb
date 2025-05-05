const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const fixAdminPassword = async () => {
  try {
    // Create fixed hash for admin123
    const passwordToHash = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordToHash, salt);
    
    // Get direct access to the database
    const db = mongoose.connection.db;
    
    // Find admin user to get the ID
    const users = await db.collection('users').find({ email: 'admin@hmps.edu' }).toArray();
    
    if (users.length === 0) {
      console.error('Admin user not found!');
      process.exit(1);
    }
    
    const admin = users[0];
    console.log('Found admin user:', admin._id);
    
    // Update password with direct MongoDB command
    const result = await db.collection('users').updateOne(
      { _id: admin._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log('Update result:', result);
    
    if (result.modifiedCount === 1) {
      console.log('✅ Admin password was successfully reset!');
      console.log('Email: admin@hmps.edu');
      console.log('Password: admin123');
      
      // Verify the password will work with bcrypt.compare
      console.log('\nVerifying password...');
      const passwordMatch = await bcrypt.compare(passwordToHash, hashedPassword);
      console.log('Password verification:', passwordMatch ? 'SUCCESS' : 'FAILED');
    } else {
      console.log('❌ Failed to reset admin password!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAdminPassword(); 