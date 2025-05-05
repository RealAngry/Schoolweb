const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - DEMO VERSION (BYPASS AUTHENTICATION)
exports.protect = async (req, res, next) => {
  // DEMO ONLY: Set default admin user for all requests
  // WARNING: This is NOT secure for production use
  req.user = {
    _id: '681626a43a051a7c351efe4a',
    displayName: 'Admin User',
    email: 'admin@hmps.edu',
    role: 'admin'
  };
  
  // Allow all requests to pass through
  console.log('DEMO MODE: Authentication bypassed for', req.method, req.originalUrl);
  next();
};

// Role-based authorization only - DEMO VERSION
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // DEMO ONLY: Always assume admin role
    const userRole = 'admin';
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: `User role ${userRole} is not authorized to access this route`
      });
    }
    
    console.log('DEMO MODE: Authorization check bypassed for role(s):', roles.join(', '));
    next();
  };
}; 