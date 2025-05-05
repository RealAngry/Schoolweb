const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  class: {
    type: String,
    required: [true, 'Class is required'],
    trim: true
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    trim: true
  },
  rollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required'],
    trim: true
  },
  motherName: {
    type: String,
    required: [true, 'Mother\'s name is required'],
    trim: true
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create student ID before saving
StudentSchema.pre('save', async function(next) {
  // Only generate ID for new documents
  if (!this.isNew) {
    this.updatedAt = Date.now();
    return next();
  }
  
  // Format: STU0001, STU0002, etc.
  const count = await this.constructor.countDocuments();
  this.id = `STU${(count + 1).toString().padStart(4, '0')}`;
  next();
});

// Add indexes for faster queries
StudentSchema.index({ class: 1, section: 1 });
StudentSchema.index({ name: 'text', fatherName: 'text', motherName: 'text' });

module.exports = mongoose.model('Student', StudentSchema); 