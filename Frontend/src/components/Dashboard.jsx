import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Navbar */}
    <Navbar />
  

      {/* Dashboard Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl
">
            <p className="text-3xl font-bold">1</p>
            <p>Courses Created</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl
">
            <p className="text-3xl font-bold">1</p>
            <p>Employees</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl
">
            <p className="text-3xl font-bold">1</p>
            <p>Requests</p>
          </div>
        </div>

        {/* Add Employees Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add Employees</button>
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
                <tr>
                  <td className="p-2 text-center" colSpan="4">
                    No Pending Requests
                  </td>
                </tr>
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
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Kartick</td>
                  <td className="p-2">Java</td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
