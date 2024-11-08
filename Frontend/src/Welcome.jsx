// src/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import './welcome.css'  

function Welcome() {
  return (
    <div className="container2">
      <h1>Welcome to Learning hub</h1>
      <div className='Description'>
      Streamline training management and boost employee development
      </div>
      <div className='wrap'>
      <button>
        <Link to="/signin" className='btn'>Sign In</Link> </button> <button><Link to="/signup" className='btn'>Sign Up</Link></button>
        </div>
      
    </div>
  );
}

export default Welcome;
