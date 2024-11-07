// src/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>
        <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Welcome;
