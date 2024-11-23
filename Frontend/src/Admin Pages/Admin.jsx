import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './AdminNavbar';
import { getAllRequests, getRequestById } from '../Api';

function Admin() {
  const [allrequests, setAllRequests] = useState([]);
  const [totalRequestsCount, setTotalRequestsCount] = useState(0);
  const [respondedRequests, setRespondedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const mockAllRequests = await getAllRequests();
        setAllRequests(mockAllRequests);
        setTotalRequestsCount(mockAllRequests.length);
        setRespondedRequests(mockAllRequests.filter(r => r.status !== 'PENDING'));
        setPendingRequests(mockAllRequests.filter(r => r.status === 'PENDING'));
        setCompletedRequests(mockAllRequests.filter(r => r.status === 'COMPLETED').length);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Button handler
const handleViewRequest = async (request) => {
  try {
    const requestData = await getRequestById(request.requestId); // Call API handler with requestId
    navigator('/viewRequest', { state: { requestData } }); // Pass data to the route
  } catch (error) {
    console.error("Failed to fetch request details:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="p-6">
        <h2 className="text-4xl font-bold text-center mb-6">Dashboard</h2>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <p className="text-3xl font-bold">{completedRequests}</p>
            <p>Courses Created</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <p className="text-3xl font-bold">1</p>
            <p>Employees</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl">
            <p className="text-3xl font-bold">{totalRequestsCount}</p>
            <p>Requests</p>
          </div>
        </div>

        {/* Pending and Completed Requests */}
        <div className="grid grid-cols-2 gap-4">
          {/* Pending Requests */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Sl No</th>
                  <th className="p-2 text-left">Manager Name</th>
                  <th className="p-2 text-left">Training Program</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {pendingRequests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-left">
                    <td className="py-2 px-4 border-b">{index + 1}</td> {/* Serial Number */}
                    <td className="py-2 px-4 border-b">{request.managerUsername}</td>
                    <td className="py-2 px-4 border-b">{request.courseName}</td>
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

          {/* Completed Requests */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Completed Requests</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Sl No</th>
                  <th className="p-2 text-left">Manager Name</th>
                  <th className="p-2 text-left">Training Program</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {respondedRequests.map((request, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-left">
                      <td className="py-2 px-4 border-b">{index + 1}</td> {/* Serial Number */}
                      <td className="py-2 px-4 border-b">{request.managerUsername}</td>
                      <td className="py-2 px-4 border-b">{request.courseName}</td>
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
        </div>
      </div>
    </div>
  );
}

export default Admin;
