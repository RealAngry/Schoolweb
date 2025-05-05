const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS with specific configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const students = require('./routes/students');
const exportRoutes = require('./routes/export');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/students', students);
app.use('/api/export', exportRoutes);

// API Test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working correctly!'
  });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const buildPath = path.resolve(__dirname, '../dist');
  app.use(express.static(buildPath));

  // For any route that is not an API route, serve the React app
  app.get('*', (req, res) => {
    if (req.url.startsWith('/api')) {
      // Let API routes be handled by the API handlers
      return res.status(404).json({
        success: false,
        error: 'API route not found'
      });
    }
    // Serve the React app for all other routes
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
} else {
  // Root route for development
  app.get('/', (req, res) => {
    res.json({ message: 'HMPS Azamgarh API Server' });
  });
  
  // Handle 404 errors in development
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found'
    });
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 