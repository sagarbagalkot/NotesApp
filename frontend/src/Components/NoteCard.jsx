import React from "react";
import { useAuth } from "../context/ContexProvider";
import { toast } from "react-toastify";

const NoteCard = ({ note, deleteNote }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!user) {
      toast.error("Please login to delete a note ❌", {
        toastId: "login-error",
      });
      return;
    }

    try {
      await deleteNote(note._id);
      toast.success("Note deleted successfully 🗑️", {
        toastId: "delete-success",
      });
    } catch (error) {
      toast.error("Failed to delete note ❌", {
        toastId: "delete-failed",
      });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between transition hover:shadow-lg">
      
      {/* Note title */}
      <h2 className="font-semibold text-teal-700 text-base sm:text-lg truncate">
        {note.title}
      </h2>

      <hr className="my-2 border-gray-300" />

      {/* Note content */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed truncate">
        {note.content}
      </p>

      {/* Created date */}
      <p className="text-gray-400 text-xs sm:text-sm mt-2 text-right">
        {new Date(note.createdAt).toLocaleString()}
      </p>

      {/* Delete button */}
      {deleteNote && (
        <button
          onClick={handleDelete}
          className="mt-3 bg-red-500 text-white text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-red-600 transition self-start"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default NoteCard;
