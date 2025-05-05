const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (admin only)
exports.getUsers = async (req, res) => {
  try {
    // DEMO MODE: Skip admin check
    console.log('DEMO MODE: Bypassing admin check for getUsers');

    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get users by role
// @route   GET /api/users/role/:role
// @access  Private (admin only)
exports.getUsersByRole = async (req, res) => {
  try {
    // DEMO MODE: Skip admin check
    console.log('DEMO MODE: Bypassing admin check for getUsersByRole');

    const { role } = req.params;

    if (!['admin', 'teacher', 'staff'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role specified'
      });
    }

    const users = await User.find({ role }).select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (admin only or self)
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // DEMO MODE: Skip authorization check
    console.log('DEMO MODE: Bypassing authorization check for getUser');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (admin only or self)
exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // DEMO MODE: Skip authorization checks
    console.log('DEMO MODE: Bypassing authorization checks for updateUser');

    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (admin only)
exports.deleteUser = async (req, res) => {
  try {
    // DEMO MODE: Skip admin check
    console.log('DEMO MODE: Bypassing admin check for deleteUser');

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Still maintain some protection for the only admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete the only admin'
        });
      }
    }

    // Use findByIdAndDelete instead of remove() which is deprecated
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 