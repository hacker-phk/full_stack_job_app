import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';

const Route = express.Router();
const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";
const photosMiddleware = multer({ dest: "uploads/" });

Route.post("/", photosMiddleware.single("photo"), (req, res) => {
  try {
    const { path: tempPath, originalname } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${tempPath}.${ext}`;

    // Rename the uploaded file to include the original extension
    fs.renameSync(tempPath, newPath);

    // Send the new file path (without "uploads/" prefix) as response
    res.json({ filename: newPath.slice(8) });  // Remove the 'uploads/' part from the file path
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default Route;
