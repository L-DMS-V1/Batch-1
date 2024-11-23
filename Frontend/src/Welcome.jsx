// src/Welcome.jsx
import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Right from "./assets/Right.json";
import img from "../src/assets/images/anime1.jpg";
import Lottie from "lottie-react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./App.css";

function Welcome() {
  const [text] = useTypewriter({
    words: ["Learning Hub", "Learning Hub"], // List of phrases
    loop: true, // Set to true for infinite loop
    typeSpeed: 120, // Typing speed
    deleteSpeed: 100, // Deleting speed
  });

  return (
    <div className="min-h-screen" id="background">
      {/* Navbar */}
      <header className="flex justify-center items-center px-8 py-4">
        <span className="text-5xl font-bold text-orange-600">Learning Hub</span>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center px-8 py-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Enrich Your Skills with <br />
            <span className="text-orange-600">{text}</span>
            <Cursor cursorStyle="<" />
          </h1>
          <p className="text-gray-600 mb-6 text-xl">
            Streamline training management and boost employee development 🚀
          </p>
          <div className="space-x-4">
            <Link to={"/signin"}>
              <button className="px-6 py-3 font-bold text-blue-500 border border-blue-500 rounded-full hover:bg-orange-100">
                Sign in
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="px-6 py-3 font-bold bg-blue-500 text-white rounded-full hover:bg-blue-700">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div
          className="group md:w-1/2 mt-8 md:mt-0 flex justify-center relative bottom-10"
          id="icon"
        >
          <Lottie loop={true} animationData={Right} />
        </div>
      </main>
      <div className="">
        <img className="h-36 absolute bottom-40 right-32" src={img} />
      </div>
    </div>
  );
}

export default Welcome;
