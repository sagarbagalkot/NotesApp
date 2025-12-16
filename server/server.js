import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import noteRoute from "./routes/noteRoute.js"; 

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/notesapp")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoute); 

app.get("/", (req, res) => res.send("API running..."));

app.listen(5000, () => console.log("Server running on port 5000"));
