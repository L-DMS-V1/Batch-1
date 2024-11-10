import React, { useState } from 'react';
import { loginUser } from './Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img from '../src/assets/images/back3.jpg'

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
        console.log("Login Successful");
        setMessage(response.message || 'Logged in successfully');
        navigator('/dashboard');
      } else {
        console.log("Error : " + response.data);
        navigator('/');
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center">
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={img}
        alt="Background"
      />
      <div className="bg-transparent border-2 border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[400px] mx-4">
        <h2 className="text-center text-4xl font-medium text-blue-900 mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="px-4 py-2 rounded-full border border-white bg-white/90 focus:outline-none"
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-200">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white text-sm">Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up Now!</Link></p>
        </div>
        <p className="mt-4 text-center text-white">{message}</p>
      </div>
    </div>
  );
}

export default SignIn;
