import React, { useState } from "react";
import { registerUser } from "./Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../src/assets/images/back2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await registerUser({
        accountId,
        accountName,
        username,
        email,
        password,
        role,
      });
      console.log({ accountId, accountName, username, email, password, role });

      if (response.data === "User registered successfully") {
        // Display success toast with delay of 2 seconds
        toast.success("Registered successfully!", {
          autoClose: 2000, // auto close after 2 seconds
        });

        setTimeout(() => {
          navigator("/signin"); // Navigate after 2 seconds
        }, 2000);
      } else {
        // Error handling
        toast.error("Error: " + response.data, {
          autoClose: 2000,
        });
        navigator("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      toast.error("Registration failed", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-fixed bg-center">
      {/* Background image */}
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={img}
        alt="Background"
      />
      {/* Card inside the image */}
      <div className="relative bg-transparent border-2 border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[400px] mx-4 z-10">
        <h2 className="text-center text-4xl font-medium text-green-500 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password" // New Confirm Password field
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          >
            <option value="">--Select Role--</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-full max-w-15 hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-400">
              Sign In
            </Link>
          </p>
        </div>
        <p className="mt-4 text-center text-white">{message}</p>
      </div>

      {/* Toast container to show notifications */}
      <ToastContainer />
    </div>
  );
}

export default SignUp;
