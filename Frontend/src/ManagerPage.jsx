import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LearningHub() {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    // Fetch data from an API or mock data
    const mockRequests = [
      {
        trainingProgram: "Java",
        position: "Developer",
        status: "COMPLETED",
        createdDate: "15/9/2024",
      },
    ];

    setRequests(mockRequests);
    setTotalRequests(mockRequests.length);
    setCompletedRequests(
      mockRequests.filter((r) => r.status === "COMPLETED").length
    );
    setPendingRequests(
      mockRequests.filter((r) => r.status !== "COMPLETED").length
    );
  }, []);

  const handleNewRequest = () => {
    // Handle creating a new request (e.g., open a modal or form)
    console.log("Creating new request...");
    navigator("/newrequest");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Learning Hub</h1>
          <div className="justify-between pr-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Hey Manager!
          </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border rounded-lg p-4 shadow">
            <p className="text-gray-600">Total Requests</p>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <p className="text-gray-600">Completed Requests</p>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow">
            <p className="text-gray-600">Pending Requests</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
        <div className="flex justify-center mb-4">
        <button className="bg-blue-500 text-white px-6 py-2 mb-4 rounded hover:bg-blue-600">
        <Link to="/Createrequest">Create New request</Link>
        </button>
        </div>

        <table className="w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2 border">Training Program</th>
              <th className="text-left p-2 border">Position</th>
              <th className="text-left p-2 border">Status</th>
              <th className="text-left p-2 border">Created Date</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">java</td>
              <td className="p-2 border">developer</td>
              <td className="p-2 border text-green-600">COMPLETED</td>
              <td className="p-2 border">15/9/2024</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LearningHub;
