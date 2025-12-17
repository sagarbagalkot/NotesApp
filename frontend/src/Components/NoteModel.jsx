import React, { useState } from "react";
import axios from "axios";
import { useAuth, BASE_URL } from "../context/ContexProvider";
import { toast } from "react-toastify";

const NoteModel = ({ setModelOpen, fetchNotes }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Note added ✅");
      fetchNotes();
      setModelOpen(false);
    } catch {
      toast.error("Failed to add note ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form onSubmit={add} className="bg-white p-6 rounded w-80">
        <h2 className="font-bold mb-3">Add Note</h2>
        <input className="border p-2 w-full mb-3" placeholder="Title"
          value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea className="border p-2 w-full mb-3" placeholder="Content"
          value={content} onChange={(e)=>setContent(e.target.value)} />
        <button className="bg-teal-600 text-white w-full py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default NoteModel;
