// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResource } from './Api';

function Dashboard() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    } else {
      // Navigate to login if no role is found
      navigate('/login');
    }
  }, [navigate]);

  const handleButtonClick = () => {
    console.log(role);
    getResource(role);
    if (role === 'ROLE_ADMIN') {
      navigate('/admin');
    } else if (role === 'ROLE_MANAGER') {
      navigate('/manager');
    } else if (role === 'ROLE_EMPLOYEE') {
      navigate('/employee');
    }
  };

  const buttonText = {
    'ROLE_ADMIN': 'Move to Admin Page',
    'ROLE_MANAGER': 'Move to Manager Page',
    'ROLE_EMPLOYEE': 'Move to Employee Page'
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center bg-cover bg-fixed bg-no-repeat">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold text-green-500">Welcome to the Dashboard</h1>
        <p className="text-lg text-gray-700">You have successfully logged in!</p>
        {role && (
          <button 
            onClick={handleButtonClick} 
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200"
          >
            {buttonText[role] || 'Proceed'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
