import jwt from "jsonwebtoken";
import { Note } from "../models/noteModel.js";

const JWT_SECRET = "secret123";

const getUserId = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token");
  return jwt.verify(token, JWT_SECRET).id;
};

export const addNote = async (req, res) => {
  try {
    const userId = getUserId(req);

    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "All fields required" });

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
