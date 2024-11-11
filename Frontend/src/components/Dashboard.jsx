import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-box-container">
        <div className="dashboard-box courses">1<br />Courses Created</div>
        <div className="dashboard-box employees">1<br />Employees</div>
        <div className="requests-container">
          <button className="add-button">+ Add Employees</button>
          <div className="dashboard-box requests">
            1<br />Requests
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
