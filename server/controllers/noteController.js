import jwt from "jsonwebtoken";
import { Note } from "../models/noteModel.js";

const JWT_SECRET = "secret123"; // same as login

// GET NOTES
export const getNotes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const notes = await Note.find({ user: decoded.id });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// ADD NOTE
export const addNote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "All fields required" });

    const note = await Note.create({
      title,
      content,
      user: decoded.id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to add note" });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
