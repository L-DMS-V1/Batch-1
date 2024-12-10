import React, { useState, useEffect } from 'react';
import img from '../assets/images/anime1.jpg';
import { useNavigate } from 'react-router-dom';
import { getRequests, getAllCoursesMan } from '../Api';

function LearningHub() {
  const [requests, setRequests] = useState([]);
  const [courses, setCourses] = useState([]);
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
        setPendingRequests(mockRequests.filter(r => r.status === 'PENDING').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getAllCoursesMan();
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleNewRequest = (course) => {
    console.log(course)
    navigator('/newrequest', { state: { course } });
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigator('/signin');
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
  };

  const closeCard = () => {
    setSelectedRequest(null);
  };

  return (
    <div className=" bg-gray-300 min-h-screen relative">
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4  shadow">
        <h1 className="text-3xl font-semibold text-orange-600">Learning Hub</h1>
        <img src={img} className='h-11 absolute left-48'/>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-white">Hey Manager!</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-6">
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

      <h2 className="text-2xl font-bold text-gray-800 text-center mt-8 mb-6">
        Course List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pt-6 pr-6 pl-6 pb-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">{course.courseName}</h2>
            <p className="mt-2 text-gray-600"><strong>Duration:</strong> {course.duration}</p>
            <p className="mt-2 text-gray-600"><strong>Key Concepts:</strong> {course.keyConcepts}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              onClick={() => handleNewRequest(course)}
            >
              Create New Request
            </button>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 text-center mt-8 mb-6">
        Requests
      </h2>

      <div className="overflow-x-auto pt-6 pl-6 pr-6 pb-6">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border-b">Training Program</th>
              <th className="py-2 px-4 border-b">Request Id</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Position</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-100 text-left">
                  <td className="py-2 px-4 border-b">{request.course.courseName}</td>
                  <td className="py-2 px-4 border-b">{request.requestId}</td>
                  <td className="py-2 px-4 border-b">{request.status}</td>
                  <td className="py-2 px-4 border-b">{request.employeePosition}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() => handleViewRequest(request)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-600">
                  No requests Created Yet
                </td>
              </tr>
            )}
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
            <p><strong>Course Name:</strong> {selectedRequest.course.courseName}</p>
            <p><strong>Key Concepts:</strong> {selectedRequest.course.keyConcepts}</p>
            <p><strong>Duration:</strong> {selectedRequest.course.duration}</p>
            <p><strong>Position:</strong> {selectedRequest.employeePosition}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <div className="mt-4">
            <strong>Required Employees:</strong>
            {selectedRequest.requiredEmployees && selectedRequest.requiredEmployees.length > 0 ? (
              <ul className="list-disc ml-5 mt-2">
                {selectedRequest.requiredEmployees.map((employee, index) => (
                  <li key={index} className="text-gray-700">
                    {employee.users.username} {/* Update this field based on the actual structure of your employee object */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No employees assigned.</p>
            )}
          </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default LearningHub;
