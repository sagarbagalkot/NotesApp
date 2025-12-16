
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContexProvider";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <nav className="bg-gray-500 p-4 text-white flex flex-col md:flex-row justify-between items-center gap-3">
      <Link to="/" className="text-xl font-bold">NoteApp</Link>

      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleSearch}
        className="bg-gray-600 px-4 py-2 rounded w-full md:w-1/3"
      />

      <div className="flex items-center gap-3 mt-2 md:mt-0">
        {!user ? (
          <>
            <Link to="/login" className="bg-red-400 px-4 py-2 rounded hover:bg-red-600 transition">Login</Link>
            <Link to="/signup" className="bg-green-400 px-4 py-2 rounded hover:bg-green-600 transition">Signup</Link>
          </>
        ) : (
          <>
            <span className="mr-4 font-semibold">{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
