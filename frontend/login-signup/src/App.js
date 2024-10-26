import React from 'react';
import './App.css';
import { BrowserRouter as BrowserRouterRouter, Routes, Route } from 'react-router-dom';
import Loginsignup from './components/Loginsignup/Loginsignup';
import Navbar from './components/Loginsignup/navbar';

function App() {
  return (
    <BrowserRouterRouter>
    <div className='app'>
      <Routes>
          <Route path='/' element={<Navbar/>}></Route>
          <Route path="/Loginsignup" element={<Loginsignup/>}></Route>
      </Routes>
    </div>
    </BrowserRouterRouter>
  );
}

export default App;
