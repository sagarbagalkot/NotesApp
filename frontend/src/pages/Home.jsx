import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModel from "../Components/NoteModel";
import NoteCard from "../Components/NoteCard";
import { useAuth } from "../context/ContexProvider";
import { toast } from "react-toastify";

const Home = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);
  const [isModelOpen, setModelOpen] = useState(false);
  const { user } = useAuth();
  const token = "user123"; 

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    if (!user) {
      toast.error("Login first ");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-2 sm:p-2 md:p-4">
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-5 sm:mb-6">Your Notes</h1>

      <button
        onClick={() => {
          if (!user) {
            toast.error("Login first next add new note");
            return;
          }
          setModelOpen(true);
        }}
        className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 text-3xl sm:text-4xl bg-teal-600 text-white p-4 sm:p-5 rounded-full shadow-lg hover:bg-teal-500 transition"
      >
        +
      </button>

      {isModelOpen && <NoteModel setModelOpen={setModelOpen} fetchNotes={fetchNotes} />}

      {filteredNotes.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-base sm:text-lg">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
