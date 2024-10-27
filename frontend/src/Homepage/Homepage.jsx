import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./homepage.css";

const Homepage = () => {
    const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");

  const handleNavigation = () => {
    setAction("Sign up");
    navigate('/signup');
  };

  const handleNaviagtion2 = () =>{
    setAction("Login");
    navigate('/login')
  };
  return (
    <div className="home">
      <div className='navbar'>
        Learning and Development Management
      </div>
      <div className="items">
        Learning and Development (LGD) Management Application
      </div>
      <div className='items2'> 
        <p>
          It aims to develop a web-based platform that streamlines the management of training and development programs in large organizations. The platform allows account managers to request training programs, the LCD team (Admin) to create and manage courses, and employees to log in, complete courses, and provide feedback. The focus is on efficient training coordination, tracking employee progress, and enhancing the learning experience.
        </p>
      </div>
      <div className="submit-container2">
        <div className='submit2' onClick={handleNavigation}>
          Sign up
        </div>
        <div className='submit3' onClick={handleNaviagtion2}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Homepage
