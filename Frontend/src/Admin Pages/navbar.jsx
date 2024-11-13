import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleCourseList = () => {
    navigate('/courselist');
  };

  const handleCourseassign = () =>{
    navigate('/courseassign');
  }

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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" 
        onClick={handleCourseassign}>
          Course Assignment
        </button>
        <span className="mr-4">Hey Admin!</span>
        <button className="text-white focus:outline-none">
          <i className="fas fa-power-off"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
