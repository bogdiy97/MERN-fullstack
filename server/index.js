import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/posts", postRoutes);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Log the connection attempt
console.log("Attempting to connect to MongoDB...");
console.log("Using URI:", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
