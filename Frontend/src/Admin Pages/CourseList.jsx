import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const CourseList = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  const handleAddCourse = () => {
    // This could navigate to a new page for adding a course, or open a modal
    navigate('/addcourse'); // Make sure you have a route set up for this
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="p-6 space-x-4" >
        <button
          onClick={handleBack}
          className="mb-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
        <button
          onClick={handleAddCourse}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Course
        </button>
      </div>
      
      {/* Course List Content */}
      <div className="flex flex-col mt-4 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Course List</h3>
        <div className="p-4 mb-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Java</h4>
          <p className="text-gray-600">Basic</p>
          <p className="text-gray-600">Duration: 2 weeks</p>
          <div className="mt-4 flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              Add Learners
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
