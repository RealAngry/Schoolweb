const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: function() {
      return `user_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    }
  },
  displayName: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'staff'],
    default: 'staff'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  department: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  console.log('Pre-save hook running');
  
  // Skip hashing if flag is set
  if (this._skipPasswordHashing) {
    console.log('Skipping password hashing due to _skipPasswordHashing flag');
    return next();
  }
  
  if (!this.isModified('password')) {
    console.log('Password not modified, skipping hashing');
    return next();
  }

  console.log('Hashing password...');
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password hashed successfully');
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  console.log('Matching password with bcrypt.compare...');
  const result = await bcrypt.compare(enteredPassword, this.password);
  console.log('Bcrypt comparison result:', result);
  return result;
};

module.exports = mongoose.model('User', UserSchema); 