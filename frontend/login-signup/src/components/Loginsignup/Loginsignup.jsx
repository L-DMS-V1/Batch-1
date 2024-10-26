import React, { useState } from 'react';
import './Loginsignup.css';


const Loginsignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [formValues, setFormValues] = useState({
    accountId: '',
    accountName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Employee',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues({
      accountId: '',
      accountName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Employee',
    });
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action !== "Login" && (
          <>
            <div className='input'>
              <input
                type='text'
                placeholder='Account ID'
                name='accountId'
                value={formValues.accountId}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <input
                type='text'
                placeholder='Account Name'
                name='accountName'
                value={formValues.accountName}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <input
                type='text'
                placeholder='Username'
                name='username'
                value={formValues.username}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <div className='input'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='input'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>
        {action !== "Login" && (
          <div className='input'>
            <input
              type='text'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        )}
        {action !== "Login" && (
          <div className='input'>
            <select
              className='input'
              name='role'
              value={formValues.role}
              onChange={handleInputChange}
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}
      </div>
      <div className="submit-container">
        <div className={action === "Login" ? "showlogin" : "submit"} onClick={() => setAction("Login")}>
          Sign up
        </div>
        <div className={action === "Sign Up" ? "showlogin" : "submit"} onClick={() => setAction("Login")}>
          Login
        </div>
        <div className={action === "Login" ? "showlogin" : "submit"} onClick={resetForm}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
