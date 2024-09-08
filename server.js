const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());          // To parse JSON request bodies
app.use(cookieParser());          // To parse cookies in request headers
app.use(cors({                    // Enable Cross-Origin Resource Sharing
  origin: 'https://mylogin9.netlify.app',  // Replace with your frontend URL (no trailing slash)
  credentials: true               // Allow credentials (cookies, authorization headers, etc.)
}));

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
