// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage"; // Import the SignupPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        {/* Add SignupPage route */}
      </Routes>
    </Router>
  );
};

export default App;
