import React, { useState, useEffect } from "react";
import { registerUser, getAllManagers, getAllEmployeesAdmin } from "./Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsCanvas from "./Welcome Page/Bgwelcome";
import { motion } from "framer-motion";
import { slideInFromTop } from "./utils/motion";
import Navbar from "./Welcome Page/Navwelcome";

function SignUp() {
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [managerId, setManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await getAllManagers();
        console.log(response);
        setManagers(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching managers", error);
        setManagers([]); // Fallback to an empty array in case of error
      }
    };

    if (role === "EMPLOYEE") {
      fetchManagers();
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 2000 });
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
        managerId,
      });
      console.log({ accountId, accountName, username, email, password, role, managerId });

      if (response.data === "User registered successfully") {
        toast.success("Registered successfully!", { autoClose: 2000 });
        // setTimeout(() => navigator("/signin"), 2000);
        setTimeout(() => navigator("/admin"), 2000);
      } else {
        toast.error("Error: " + response.data, { autoClose: 2000 });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      toast.error("Registration failed", { autoClose: 2000 });
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <StarsCanvas />
      </div>
      <motion.div
        className="relative bg-transparent border-2 border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[400px] mx-4 z-10 mt-11"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
      >
        <motion.h2
          className="text-center text-4xl font-medium text-green-500 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Add Employee / Manager
        </motion.h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <motion.input
            type="text"
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.input 
            type="text"
            placeholder="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <motion.select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <option value="">--Select Role--</option>
            <option value="MANAGER">MANAGER</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </motion.select>
          {role === "EMPLOYEE" && Array.isArray(managers) && (
          <motion.select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <option value="">--Select Manager--</option>
            {managers.map((manager) => (
              <option key={manager.managerId} value={manager.managerId}>
                {manager.users.username} ({manager.users.email})
              </option>
            ))}
          </motion.select>
        )}
          <motion.button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-full max-w-15 hover:bg-green-600 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign Up
          </motion.button>
        </form>
        {/* <div className="mt-4 text-center">
          <motion.p
            className="text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-400">
              Sign In
            </Link>
          </motion.p>
        </div> */}
        <motion.p
          className="mt-4 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {message && <span>{message}</span>}
        </motion.p>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default SignUp;
