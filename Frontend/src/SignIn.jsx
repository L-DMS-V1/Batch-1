// src/SignIn.jsx
import React, { useState } from 'react';
import { loginUser } from './Api';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      if(response){
        console.log("Login Successful")
        setMessage(response.message || 'Logged in successfully');
        navigator('/dashboard')
      }else{
        console.log("Error : " + response.data)
        navigator('/')
      }
    } catch (error) {
        console.log(error)
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignIn;
