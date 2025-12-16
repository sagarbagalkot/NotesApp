import express from "express";
import { addNote, getNotes, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);

router.post("/add", addNote);

router.delete("/:id", deleteNote);

export default router;
