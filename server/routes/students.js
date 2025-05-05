const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass
} = require('../controllers/students');

// Middleware
const { protect, authorize } = require('../middleware/auth');

// Student routes
router
  .route('/')
  .get(protect, getStudents)
  .post(protect, authorize('admin', 'teacher'), createStudent);

router
  .route('/:id')
  .get(protect, getStudent)
  .put(protect, authorize('admin', 'teacher'), updateStudent)
  .delete(protect, authorize('admin'), deleteStudent);

router
  .route('/class/:className')
  .get(protect, authorize('admin', 'teacher'), getStudentsByClass);

module.exports = router; 