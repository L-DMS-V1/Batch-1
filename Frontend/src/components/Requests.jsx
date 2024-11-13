import React from 'react';

const Requests = () => (
  <div className="requests space-y-6">
    <div className="request-box bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Requests</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">SL No</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Manager Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Training Program</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-gray-700">1</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-700">John</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-700">Java</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-700">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="request-box bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Completed Requests</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">SL No</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Manager Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Training Program</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-gray-700">1</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-700">Kartick</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-700">Java</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => window.open('https://youtu.be/WRISYpKhIrc?si=MEcP-1LnAPSAjyO8')}
                className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
              >
                View Video
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Requests;
