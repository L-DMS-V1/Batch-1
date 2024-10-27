import React from 'react';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CourseAssignment from './components/CourseAssignment';
import Requests from './components/Requests';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <h2>Learning Hub</h2>
        <div className="user-info">Hey Admin! <button id="logout-btn">🔓</button></div>
      </header>

      <Dashboard />
      <Requests />
      <CourseList />
      <CourseAssignment />
    </div>
  );
}

export default App;
