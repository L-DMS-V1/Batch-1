import React, { useState } from 'react';
import "./login.css";

const Login = () => {
    const setAction = useState("Sign Up");

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input
            type='email'
            placeholder='Email'
            name='email'
          />
        </div>
        <div className='input'>
          <input
            type='password'
            placeholder='Password'
            name='password'
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={() => setAction("Login")}>
          Login
        </div>
      </div>
    </div>
  )
}

export default Login
