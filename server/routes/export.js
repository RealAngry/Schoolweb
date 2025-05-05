const express = require('express');
const router = express.Router();
const {
  exportStudentData,
  exportReportData
} = require('../controllers/export');

// Middleware
const { protect, authorize } = require('../middleware/auth');

// Export routes
router
  .route('/students/:id')
  .get(protect, authorize('admin', 'teacher'), exportStudentData);

router
  .route('/reports/:type')
  .post(protect, authorize('admin'), exportReportData);

module.exports = router; 