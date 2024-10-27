import React from 'react';
import './Dashboard.jsx'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Learning Hub Dashboard</h2>
      <div className="card blue">1<br />Courses Created</div>
      <div className="card green">1<br />Employees</div>
      <div className="card purple">1<br />Requests</div>
    </div>
  );
};

export default Dashboard;
