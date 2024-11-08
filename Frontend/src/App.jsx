import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CourseAssignment from './components/CourseAssignment';
import Requests from './components/Requests';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard />;
      case 'CourseList':
        return <CourseList />;
      case 'CourseAssignment':
        return <CourseAssignment />;
      case 'Requests':
        return <Requests />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <header className="navbar">
        <h2>Learning Hub</h2>
        <div className="user-info">
          Hey Admin! <button id="logout-btn" onClick={() => alert("Logged out!")}>🔓</button>
        </div>
      </header>

      <main className="centered-content">
        <h1>Learning Hub</h1>
        <div className="navigation-buttons">
          <button onClick={() => setActiveSection('Dashboard')}>Dashboard</button>
          <button onClick={() => setActiveSection('CourseList')}>Course List</button>
          <button onClick={() => setActiveSection('CourseAssignment')}>Course Assignment</button>
          <button onClick={() => setActiveSection('Requests')}>Requests</button>
        </div>
        
        <div className="section-content">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
