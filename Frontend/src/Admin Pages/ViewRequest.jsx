import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { acceptRequest, rejectRequest } from '../Api';

const ViewRequest = () => {
  const location = useLocation();
  const { requestData } = location.state || {};

  const navigator = useNavigate();

  const handleAcceptRequest = async () => {
    try {
      await acceptRequest(requestData.requestId);
      alert("Request accepted successfully!");
      navigator('/admin'); // Go back to the previous page or refresh data
    } catch (error) {
      console.error("Failed to accept request:", error);
      alert("Failed to accept the request.");
    }
  };

  const handleRejectRequest = async () => {
    try {
      await rejectRequest(requestData.requestId);
      alert("Request rejected successfully!");
      navigator('/admin'); // Go back to the previous page or refresh data
    } catch (error) {
      console.error("Failed to reject request:", error);
      alert("Failed to reject the request.");
    }
  };

  const handleCreateCourse = () => { 
    navigator('/createCourse', { state: { requestId: requestData.requestId } });
  };

  if (!requestData) {
    return <p>Loading request details...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request Details</h2>
      <p><strong>Request ID:</strong> {requestData.requestId}</p>
      <p><strong>Course Name:</strong> {requestData.courseName}</p>
      <p><strong>Description:</strong> {requestData.description}</p>
      <p><strong>Concepts:</strong> {requestData.concepts}</p>
      <p><strong>Duration:</strong> {requestData.duration}</p>
      <p><strong>Employee Position:</strong> {requestData.employeePosition}</p>
      <p><strong>Required Employees:</strong> {requestData.requiredEmployees}</p>
      <p><strong>Status:</strong> {requestData.status}</p>
      <p><strong>Manager Username:</strong> {requestData.managerUsername}</p>

      <div className="mt-4">
        {requestData.status === 'ACCEPTED' ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
            onClick={handleCreateCourse}
          >
            Create Course
          </button>
        ) : requestData.status === 'REJECTED' ? (
          <p className="text-red-500 font-bold">The Request has been REJECTED.</p>
        ) : requestData.status === 'COMPLETED' ? (
          <p className="text-green-500 font-bold">The Request has been ACCEPTED, and Course is CREATED</p>
        ) :  (
          <>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
              onClick={handleAcceptRequest}
            >
              Accept Request
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              onClick={handleRejectRequest}
            >
              Reject Request
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default ViewRequest;