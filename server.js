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


const allowedOrigins = [
  'http://localhost:3000',  
  'https://mylogin9.netlify.app',  
];


const corsOptions = {
  origin: function (origin, callback) {
   
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true,  
};


app.use(cors(corsOptions));

app.use(express.json());


app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
