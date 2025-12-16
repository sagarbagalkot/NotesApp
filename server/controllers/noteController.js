import { Note } from "../models/noteModel.js";


export const getNotes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

  
    const userId = token; 
    const notes = await Note.find({ user: userId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// ---------------- ADD NOTE ----------------
export const addNote = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const note = new Note({
      title,
      content,
      user: token, 
    });

    const saved = await note.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
};

// ---------------- DELETE NOTE ----------------
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deleted = await Note.findByIdAndDelete(noteId);

    if (!deleted) return res.status(404).json({ error: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
