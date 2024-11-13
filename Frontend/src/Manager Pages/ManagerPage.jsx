import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../Api';

function LearningHub() {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const mockRequests = await getRequests();
        setRequests(mockRequests);
        setTotalRequests(mockRequests.length);
        setCompletedRequests(mockRequests.filter(r => r.status === 'COMPLETED').length);
        setPendingRequests(mockRequests.filter(r => r.status !== 'COMPLETED').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleNewRequest = () => {
    navigator('/newrequest');
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const closeCard = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-semibold">Learning Hub</h1>
        <div className="flex items-center space-x-2">
          <span className="text-lg">Hey Manager!</span>
          <button className="text-red-500 hover:text-red-700">
            <i className="fa fa-power-off text-xl"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Total Requests</h3>
          <p className="text-2xl font-bold">{totalRequests}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Completed Requests</h3>
          <p className="text-2xl font-bold">{completedRequests}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-medium">Pending Requests</h3>
          <p className="text-2xl font-bold">{pendingRequests}</p>
        </div>
      </div>

      <div className='flex justify-center mb-4 ml-15'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mb-4"
          onClick={handleNewRequest}
        >
          Create New Request
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">Training Program</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Required Employees</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="hover:bg-gray-100 text-left">
                <td className="py-2 px-4 border-b">{request.courseName}</td>
                <td className="py-2 px-4 border-b">{request.employeePosition}</td>
                <td className="py-2 px-4 border-b">{request.status}</td>
                <td className="py-2 px-4 border-b">{request.requiredEmployees}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    onClick={() => handleViewRequest(request)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg rounded-md w-11/12 md:w-2/3 lg:w-1/2 transform translate-y-0 transition-transform duration-300 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeCard}
            >
              &times;
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Request Details</h2>
            </div>
            <p><strong>Course Name:</strong> {selectedRequest.courseName}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Concepts:</strong> {selectedRequest.concepts}</p>
            <p><strong>Duration:</strong> {selectedRequest.duration}</p>
            <p><strong>Position:</strong> {selectedRequest.employeePosition}</p>
            <p><strong>Required Employees:</strong> {selectedRequest.requiredEmployees}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningHub;