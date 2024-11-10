import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDB from './middlewares/mongoose.connect.js';
import authRoutes from "./routes/auth.routes.js";
import protectedRoute from './middlewares/authorizeUser.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import upload from "./routes/upload.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/auth', authRoutes);
app.use('/employee',protectedRoute, employeeRoutes);
app.use("/upload",protectedRoute, upload);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Start server
app.listen(process.env.PORT, () => {
  connectToDB();
  console.log('Server is running on http://localhost:' + process.env.PORT);
});
