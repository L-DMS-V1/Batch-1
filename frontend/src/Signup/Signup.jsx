import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
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

  const handleNaviagtion2 = () => {
    setAction("Login");
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input
            type='text'
            placeholder='Account ID'
            name='accountId'
            value={formValues.accountId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <input
            type='text'
            placeholder='Account Name'
            name='accountName'
            value={formValues.accountName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={formValues.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='input'>
          <select
            className='input'
            name='role'
            value={formValues.role}
            onChange={handleInputChange}
            required
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleNaviagtion2}>
          Sign up
        </div>
        <div className="submit" onClick={resetForm}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default Signup;
