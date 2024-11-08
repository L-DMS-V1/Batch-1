import React, { useState, useEffect } from 'react';
import './managerpage.css'
import { useNavigate } from 'react-router-dom';

function LearningHub() {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const navigator= useNavigate();

  useEffect(() => {
    // Fetch data from an API or mock data
    const mockRequests = [
      {
        trainingProgram: 'Java',
        position: 'Developer',
        status: 'COMPLETED',
        createdDate: '15/9/2024',
      },
    ];

    setRequests(mockRequests);
    setTotalRequests(mockRequests.length);
    setCompletedRequests(mockRequests.filter(r => r.status === 'COMPLETED').length);
    setPendingRequests(mockRequests.filter(r => r.status !== 'COMPLETED').length);
  }, []);

  const handleNewRequest = () => {
    // Handle creating a new request (e.g., open a modal or form)
    console.log('Creating new request...');
    navigator('/newrequest')

  };

  return (
    <div className="learning-hub">
      <div className="header">
        <div className="title">Learning Hub</div>
        <div className="manager-info">
          Hey Manager!
          <button className="power-button">
            <i className="fa fa-power-off"></i>
          </button>
        </div>
      </div>

      <div className="request-summary">
        <div className="request-card">
          <h3>Total Requests</h3>
          <p>{totalRequests}</p>
        </div>
        <div className="request-card">
          <h3>Completed Requests</h3>
          <p>{completedRequests}</p>
        </div>
        <div className="request-card">
          <h3>Pending Requests</h3>
          <p>{pendingRequests}</p>
        </div>
      </div>

      <button className="new-request-button" onClick={handleNewRequest}>
        Create New Request
      </button>

      <table className="request-table">
        <thead>
          <tr>
            <th>Training Program</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.trainingProgram}</td>
              <td>{request.position}</td>
              <td>{request.status}</td>
              <td>{request.createdDate}</td>
              <td><button className="view-button">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LearningHub;