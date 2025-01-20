import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

// Hardcode the MongoDB URI temporarily for testing
const MONGODB_URI =
  "mongodb+srv://root:root@cluster0.91fyb.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Add a root route
app.get("/", (req, res) => {
  res.send("Hello from MERN API!");
});

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

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
