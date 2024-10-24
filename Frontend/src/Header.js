// src/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="navbar">
                <button className="menu-button">☰</button>
                <h1>LearningHub</h1>
                <div className="auth-buttons">
                    <button className="sign-up" onClick={() => navigate('/signup')}>Sign Up</button>
                    <button className="login" onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
