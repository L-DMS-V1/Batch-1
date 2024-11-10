// src/Welcome.jsx
import React from 'react';
import "./index.css";
import { Link } from 'react-router-dom'; 
import img from "../src/assets/images/back.jpg"

function Welcome() {
  return (
    <div className="relative w-full h-screen">
    {/* Background image */}
    <img className="w-full h-full object-cover" src={img} alt="Background" />
    
    {/* Card box */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/10 -translate-y-1/2 text-center p-6 bg-transparent border-2 border-white/20 backdrop-blur-lg rounded-lg shadow-lg w-[500px] mx-4">
      <h1 className="text-4xl font-medium text-green-900">Welcome to Learning Hub</h1>
      <div className="mt-4 font-medium text-blue-700 text-lg">
        Streamline training management and boost employee development
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-200">
        <Link to="/signin">Sign In</Link>
        </button>
        <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-200">
        <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  </div>
  );
}

export default Welcome;
