import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/images/anime1.jpg';
// import { logout } from '../Api'; // Assuming you have the logout function in your Api.js file

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // logout();  // Call the logout function to clear localStorage
    navigate('/signin');  // Redirect to login page after logout
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-orange-600">Learning Hub</h1>
      <img src={img} className='h-11 absolute left-48'/>
      <div className="flex items-center space-x-4">
        <span className="mr-4">Hey Employee!</span>
        
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

export default Navbar;
