import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './AdminNavbar';

const CourseAssignment = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  const handleEmployeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployees([...selectedEmployees, value]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(emp => emp !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Assigned course to: ${selectedEmployees.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={handleBack}
          className=" px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Course Assignment Content */}
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Assign Course to Employees</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Details:</label>
            <p className="text-gray-600"><b>Course Name:</b> Java</p>
            <p className="text-gray-600"><b>Description:</b> Basic</p>
            <p className="text-gray-600"><b>Duration:</b> 2 weeks</p>
          </div>

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
            <input
              type="date"
              id="start-date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Select Employees:</h4>
            <div className="space-y-2">
              <div>
                <input
                  type="checkbox"
                  id="emp1"
                  value="raja@gmail.com"
                  onChange={handleEmployeeChange}
                  className="mr-2"
                />
                <label htmlFor="emp1" className="text-gray-700">Raja (raja@gmail.com)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="emp2"
                  value="ram@gmail.com"
                  onChange={handleEmployeeChange}
                  className="mr-2"
                />
                <label htmlFor="emp2" className="text-gray-700">Ram (ram@gmail.com)</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="emp3"
                  value="siva@gmail.com"
                  onChange={handleEmployeeChange}
                  className="mr-2"
                />
                <label htmlFor="emp3" className="text-gray-700">Siva (siva@gmail.com)</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition-colors"
          >
            Assign Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseAssignment;
