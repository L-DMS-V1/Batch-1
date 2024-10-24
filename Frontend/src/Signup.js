// src/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        accountId: '',
        accountName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'MANAGER',
        showPassword: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Handle signup logic here, like calling an API to create a new user
        console.log('Form Data:', formData);
        navigate('/'); // Redirect to the home page or login page after signup
    };

    const handleReset = () => {
        setFormData({
            accountId: '',
            accountName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'MANAGER',
            showPassword: false,
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Account ID:</label>
                        <input 
                            type="text" 
                            name="accountId" 
                            value={formData.accountId} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Account Name:</label>
                        <input 
                            type="text" 
                            name="accountName" 
                            value={formData.accountName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type={formData.showPassword ? 'text' : 'password'} 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input 
                            type={formData.showPassword ? 'text' : 'password'} 
                            name="confirmPassword" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="checkbox" 
                            name="showPassword" 
                            checked={formData.showPassword} 
                            onChange={handleChange} 
                        /> Show Password
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                        >
                            <option value="MANAGER">MANAGER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="signup-button">Sign Up</button>
                        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
