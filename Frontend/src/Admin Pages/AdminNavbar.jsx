import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  // Handle navigating to the course list
  const handleCourseList = () => {
    navigate('/courselist');
  };

  // Handle navigating to course assignment page
  const handleCourseassign = () => {
    navigate('/courseassign');
  };

  // Handle navigating to employee progress page
  const handleEmployeeProgress = () => {
    navigate('/employeeprogress');
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/signin');  // Redirect to login page after logout
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Learning Hub</h1>
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleCourseList}
        >
          Course List
        </button>
        {/* <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleCourseassign}
        >
          Course Assignment
        </button> */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleEmployeeProgress}
        >
          Employee Progresses
        </button>
        <span className="mr-4">Hey Admin!</span>
        
        {/* Logout Button */}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
