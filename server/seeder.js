const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a default admin user
const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@hmps.edu' });
    
    if (adminExists) {
      console.log('Admin user already exists - skipping creation');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = {
      displayName: 'Administrator',
      email: 'admin@hmps.edu',
      password: hashedPassword,
      role: 'admin',
      department: 'Administration',
      position: 'System Administrator',
      _skipPasswordHashing: true // Skip the password hashing in the pre-save hook
    };
    
    await User.create(adminUser);
    console.log('Default admin user created - EMAIL: admin@hmps.edu PASSWORD: admin123');
    console.log('PLEASE CHANGE THE PASSWORD AFTER FIRST LOGIN!');
  } catch (err) {
    console.error(err);
  }
};

// Import all data
const importData = async () => {
  try {
    await createAdminUser();
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await User.deleteMany({});
    console.log('All data deleted');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import data or -d to delete all data');
  process.exit();
} 