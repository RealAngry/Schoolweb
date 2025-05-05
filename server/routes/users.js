const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUsersByRole,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // All user routes are protected

router
  .route('/')
  .get(authorize('admin'), getUsers);

router
  .route('/role/:role')
  .get(authorize('admin'), getUsersByRole);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router; 