const Student = require('../models/Student');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
exports.getStudents = asyncHandler(async (req, res, next) => {
  // Implement filtering, sorting, and pagination
  const query = { ...req.query };
  
  // Fields to exclude from filtering
  const excludeFields = ['select', 'sort', 'page', 'limit'];
  excludeFields.forEach(field => delete query[field]);
  
  // Create query string and replace operators with MongoDB operators
  let queryStr = JSON.stringify(query);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Finding resource
  let students = Student.find(JSON.parse(queryStr)).populate('createdBy', 'displayName');
  
  // Select specific fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    students = students.select(fields);
  }
  
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    students = students.sort(sortBy);
  } else {
    students = students.sort('-createdAt');
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Student.countDocuments(JSON.parse(queryStr));
  
  students = await students.skip(startIndex).limit(limit);
  
  // Pagination result
  const pagination = {};
  
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  
  res.status(200).json({
    success: true,
    count: students.length,
    pagination,
    total,
    students
  });
});

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate('createdBy', 'displayName');
  
  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    student
  });
});

// @desc    Create new student
// @route   POST /api/students
// @access  Private
exports.createStudent = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;
  
  // Create student
  const student = await Student.create(req.body);
  
  res.status(201).json({
    success: true,
    student
  });
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = asyncHandler(async (req, res, next) => {
  let student = await Student.findById(req.params.id);
  
  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Ensure user is the creator or an admin
  if (student.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to update this student`, 401)
    );
  }
  
  // Update the student
  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    student
  });
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);
  
  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id of ${req.params.id}`, 404)
    );
  }
  
  // Ensure user is the creator or an admin
  if (student.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.user.id} is not authorized to delete this student`, 401)
    );
  }
  
  await student.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get students by class
// @route   GET /api/students/class/:className
// @access  Private
exports.getStudentsByClass = asyncHandler(async (req, res, next) => {
  const students = await Student.find({ 
    class: req.params.className,
    status: 'active'
  }).sort('rollNo');
  
  res.status(200).json({
    success: true,
    count: students.length,
    students
  });
}); 