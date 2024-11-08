// src/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';  

function Welcome() {
  return (
    <div className="container">
      <h1>Welcome to Learning hub</h1>
      <div className='Description'>
      Streamline training management and boost employee development
      </div>
      
      <button>
        <Link to="/signin">Sign In</Link> </button> <button><Link to="/signup">Sign Up</Link></button>
     
      
    </div>
  );
}

export default Welcome;
