import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";

const app = express();

dotenv.config();
dbConnect();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://mylogin9.netlify.app',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow credentials (e.g., cookies, authorization headers)
};

app.use(cors(corsOptions));

// Parse incoming JSON requests
app.use(express.json());

// API routes
app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

// Set up the server to listen on the specified port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
