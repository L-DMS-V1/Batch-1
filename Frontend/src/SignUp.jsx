// src/SignUp.jsx
import React, { useState } from 'react';
import { registerUser } from './Api';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [message, setMessage] = useState('');

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ accountId, accountName, username, email, password, role });
      console.log({ accountId, accountName, username, email, password, role });
      if(response.data == "User registered successfully"){
        console.log(response.data)
        setMessage(response.message || 'Registered successfully');
        navigator('/signin')
      }else{
        console.log("Error : " + response.data)
        navigator('/')
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Account ID" 
          value={accountId} 
          onChange={(e) => setAccountId(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Account Name" 
          value={accountName} 
          onChange={(e) => setAccountName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">--Select Role--</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>
        <button type="submit" className='Sign'>Sign Up</button>
      </form>
      <div className='registerlink'>
          <p>Already have an account <Link to="/Signin">Signin</Link></p>
        </div>
      <p>{message}</p>
    </div>
  );
}

export default SignUp;
