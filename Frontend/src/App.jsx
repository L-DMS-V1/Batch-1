// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';
import ManagerPage from './ManagerPage';
import Managerrequest from './Managerrequest';
import ProtectedRoute from './ProtectedRoute';
import Forbidden from './Forbidden';

function App() {
  const userRole = localStorage.getItem('role'); // or from Context

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/forbidden" element={<Forbidden />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} userRole={userRole} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['ROLE_MANAGER']} userRole={userRole} />}>
          <Route path="/manager" element={<ManagerPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['ROLE_EMPLOYEE']} userRole={userRole} />}>
          <Route path="/employee" element={<EmployeePage />} />
        </Route>
        <Route path='/newrequest' element={<Managerrequest />} />
      </Routes>
    </Router>
  );
}

export default App;
