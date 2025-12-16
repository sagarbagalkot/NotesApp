import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/noteRoute.js";

dotenv.config();
connectDB(); // IMPORTANT: Move OUTSIDE listen()

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
