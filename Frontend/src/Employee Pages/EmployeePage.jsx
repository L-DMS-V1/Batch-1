import React, { useState } from "react";
import Navbar from "./EmployeeNavbar";

function EmployeePage() {
  const [isProgressDropdownOpen, setIsProgressDropdownOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isOngoingModalOpen, setIsOngoingModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const toggleProgressDropdown = () => {
    setIsProgressDropdownOpen(!isProgressDropdownOpen);
  };

  const toggleLearningDropdown = () => {
    setIsLearningDropdownOpen(!isLearningDropdownOpen);
  };

  const openAssignedModal = () => {
    setIsAssignedModalOpen(true);
  };

  const closeAssignedModal = () => {
    setIsAssignedModalOpen(false);
  };

  const openOngoingModal = () => {
    setIsOngoingModalOpen(true);
  };

  const closeOngoingModal = () => {
    setIsOngoingModalOpen(false);
  };

  const openCompletedModal = () => {
    setIsCompletedModalOpen(true);
  };

  const closeCompletedModal = () => {
    setIsCompletedModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Title */}
      <h2 className="text-center text-3xl font-bold mt-8">Employee Dashboard</h2>

      {/* Stats Boxes */}
      <div className="flex justify-center mt-8 space-x-4">
        <div
          className="bg-blue-200 p-6 rounded-lg w-1/4 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openAssignedModal}
        >
          <h3 className="text-lg font-semibold">Total Courses Assigned</h3>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div
          className="bg-green-200 p-6 rounded-lg w-1/3 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openOngoingModal}
        >
          <h3 className="text-lg font-semibold">Total Courses OnGoing</h3>
          <p className="text-4xl font-bold">0</p>
        </div>
        <div
          className="bg-yellow-200 p-6 rounded-lg w-1/4 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openCompletedModal}
        >
          <h3 className="text-lg font-semibold">Total Courses Completed</h3>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-4 px-8">
        {/* My Learning Dropdown */}
        <div
          className="bg-purple-200 p-6 rounded-lg text-xl font-semibold cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          onClick={toggleLearningDropdown}
        >
          My Learning
        </div>

        {/* Learning Dropdown Content */}
        {isLearningDropdownOpen && (
          <div className="bg-white p-4 rounded-lg shadow-lg mt-2">
            <h4 className="text-lg font-semibold">Assigned Courses</h4>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Course A: Introduction to React</li>
              <li>Course B: Advanced JavaScript</li>
              <li>Course C: Tailwind CSS Basics</li>
            </ul>
          </div>
        )}
        
        {/* My Progress Dropdown */}
        <div
          className="bg-blue-200 p-6 rounded-lg text-xl font-semibold cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          onClick={toggleProgressDropdown}
        >
          My Progress
        </div>

        {/* Progress Dropdown Content */}
        {isProgressDropdownOpen && (
          <div className="bg-white p-4 rounded-lg shadow-lg mt-2">
            <h4 className="text-lg font-semibold">Course Progress</h4>
            <div className="mt-4">
              <p className="text-sm font-semibold">Course 1</p>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold">Course 2</p>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold">Course 3</p>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isAssignedModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Assigned Courses</h3>
          <ul className="list-disc list-inside space-y-2 text-center">
            <li>Course A: Introduction to React</li>
            <li>Course B: Advanced JavaScript</li>
            <li>Course C: Tailwind CSS Basics</li>
          </ul>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={closeAssignedModal}
          >
            Close
          </button>
        </div>
      </div>
      
      )}

      {isOngoingModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Ongoing Courses</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Course D: Intermediate React</li>
              <li>Course E: JavaScript ES6+</li>
              <li>Course F: Advanced Tailwind CSS</li>
            </ul>
            <button
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={closeOngoingModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCompletedModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Completed Courses</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Course G: Basic HTML & CSS</li>
              <li>Course H: Git and Version Control</li>
              <li>Course I: Responsive Web Design</li>
            </ul>
            <button
              className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={closeCompletedModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePage;
