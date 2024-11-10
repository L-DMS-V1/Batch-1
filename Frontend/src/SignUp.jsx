import React, { useState } from "react";
import { registerUser } from "./Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../src/assets/images/back2.jpg";

function SignUp() {
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log(response.data);
        setMessage(response.message || "Registered successfully");
        navigator("/signin");
      } else {
        console.log("Error : " + response.data);
        navigator("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
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
    </div>
  );
}

export default SignUp;
