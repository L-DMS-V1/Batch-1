import React, { useState } from "react";
import { changePasswordAPI } from "./Api"; // Import the API endpoint
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import StarsCanvas from "./Welcome Page/Bgwelcome"; // Import the star background
import { motion } from "framer-motion"; // Import Framer Motion
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "./utils/motion"; // Import motion variants
import Navbar from "./Welcome Page/Navwelcome";

function ChangePassword() {
  const [username, setUsername] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await changePasswordAPI({
        username,
        previousPassword,
        newPassword,
      });
      toast.success("Password changed successfully!");
      setTimeout(() => {
        navigate("/signin"); // Redirect to login or any other page after success
      }, 2000);
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error(
        error.response?.data?.message || "Password change failed",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 -z-10">
        <StarsCanvas />
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
      >
        <motion.div
          className="bg-transparent border-2 border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[400px] mx-4"
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft(0.2)}
        >
          <motion.h2
            className="text-center text-4xl font-medium text-green-600 mb-4"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            Change Password
          </motion.h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <motion.input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
              variants={slideInFromLeft(0.4)}
              initial="hidden"
              animate="visible"
            />
            <motion.input
              type="password"
              placeholder="Previous Password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
              variants={slideInFromLeft(0.6)}
              initial="hidden"
              animate="visible"
            />
            <motion.input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
              variants={slideInFromLeft(0.8)}
              initial="hidden"
              animate="visible"
            />
            <motion.input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
              variants={slideInFromLeft(1.0)}
              initial="hidden"
              animate="visible"
            />
            <motion.button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-200"
              variants={slideInFromRight(1.2)}
              initial="hidden"
              animate="visible"
            >
              Change Password
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ChangePassword;
