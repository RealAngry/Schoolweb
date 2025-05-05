const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { displayName, email, password, role, department, position, phoneNumber, userId } = req.body;

    console.log('Register attempt received:', { 
      email, 
      displayName, 
      role,
      userId: userId || 'Not provided, will use default' 
    });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already in use'
      });
    }

    // Create user with userId if provided
    const userData = {
      displayName,
      email,
      password,
      role: role || 'staff', // Default to staff if no role provided
      department,
      position,
      phoneNumber
    };

    // Only add userId if it's provided in the request
    if (userId) {
      userData.userId = userId;
    }

    console.log('Creating user with data:', { ...userData, password: '[HIDDEN]' });
    const user = await User.create(userData);

    console.log('User created successfully with ID:', user._id, 'and userId:', user.userId);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        userId: user.userId,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('Login attempt received:', { email: req.body.email });
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Continue with standard authentication flow
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('Login failed: User not found', { email });
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log('User found, checking password');
    console.log('User from DB:', {
      id: user._id,
      email: user.email,
      role: user.role,
      passwordLength: user.password ? user.password.length : 0
    });
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);
    console.log('Comparing input password:', password, 'with hashed password (first 10 chars):', user.password.substring(0, 10) + '...');
    
    if (!isMatch) {
      console.log('Login failed: Password does not match');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log('Login successful:', { email, userId: user._id });

    // Return user data without token
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 