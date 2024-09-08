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

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://mylogin9.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true               // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
