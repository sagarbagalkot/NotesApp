import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, BASE_URL } from "../context/ContexProvider"; // use BASE_URL

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      login(res.data.user); 
      toast.success("Login Successful!");

      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center place-items-start p-10 bg-gray-200 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="border w-full px-3 py-2 rounded mb-3 text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="border w-full px-3 py-2 rounded mb-4 text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-orange-500 text-white w-full py-2 rounded text-sm sm:text-base hover:bg-orange-300 transition">
          Login
        </button>

        <p className="mt-3 text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
