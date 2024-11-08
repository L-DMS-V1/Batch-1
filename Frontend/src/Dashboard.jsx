// src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Dashboard() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleButtonClick = () => {
    console.log(role)
    if (role === 'ROLE_ADMIN') {
      navigate('/admin');
    } else if (role === 'ROLE_MANAGER') {
      navigate('/manager');
    } else if (role === 'ROLE_EMPLOYEE') {
      navigate('/employee');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>You have successfully logged in!</p>
      {role === 'ROLE_ADMIN' && <button onClick={handleButtonClick}>Move to Admin Page</button>}
      {role === 'ROLE_MANAGER' && <button onClick={handleButtonClick}>Move to Manager Page</button>}
      {role === 'ROLE_EMPLOYEE' && <button onClick={handleButtonClick}>Move to Employee Page</button>}
    </div>
  );
}

export default Dashboard;
