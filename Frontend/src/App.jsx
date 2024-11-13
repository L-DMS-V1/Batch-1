import './index.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CourseAssignment from './components/CourseAssignment';



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/courselist' element={<CourseList/>}/>
        <Route path='/Courseassign' element={<CourseAssignment/>}/>
      </Routes>
    </Router>
  );
}

export default App
