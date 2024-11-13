// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import AdminPage from './Admin Pages/Admin';
import EmployeePage from './EmployeePage';
import ManagerPage from './Manager Pages/ManagerPage';
import Managerrequest from './Manager Pages/Managerrequest';
import ProtectedRoute from './ProtectedRoute';
import Forbidden from './Forbidden';
import CourseList from './Admin Pages/CourseList';
import CourseAssignment from './Admin Pages/CourseAssignment';
import ViewRequest from './Admin Pages/ViewRequest';
import CreateCourse from './Admin Pages/CreateCourse';
import EditCourse from './Admin Pages/EditCourse';

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
        
        <Route path='/courselist' element={<CourseList/>}/>
        <Route path='/Courseassign' element={<CourseAssignment/>}/>
        <Route path='/viewRequest' element={<ViewRequest/>}/>
        <Route path='/createCourse' element={<CreateCourse/>}/>
        <Route path='/editCourse' element={<EditCourse/>}/>
      </Routes>
    </Router>
  );
}

export default App;
