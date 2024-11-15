import React from "react";
import Navbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

const EmployeeProgresses = () => {
  // Sample data
  const employeeData = [
    { name: "John Doe", course: "React Basics", progress: 80 },
    { name: "Jane Smith", course: "React Basics", progress: 60 },
    { name: "Mike Johnson", course: "React Basics", progress: 90 },
    { name: "John Doe", course: "Java Spring Boot", progress: 70 },
    { name: "Jane Smith", course: "Java Spring Boot", progress: 50 },
    { name: "Mike Johnson", course: "Java Spring Boot", progress: 30 },
    { name: "John Doe", course: "Microservices Architecture", progress: 60 },
    { name: "Jane Smith", course: "Microservices Architecture", progress: 40 },
    { name: "John Doe", course: "AWS Cloud Essentials", progress: 90 },
    { name: "Jane Smith", course: "AWS Cloud Essentials", progress: 80 },
    { name: "Mike Johnson", course: "AWS Cloud Essentials", progress: 100 },
    { name: "John Doe", course: "Docker and Kubernetes", progress: 50 },
    { name: "Jane Smith", course: "Docker and Kubernetes", progress: 70 },
    { name: "Mike Johnson", course: "Docker and Kubernetes", progress: 60 },
  ];

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-between px-4 mb-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold flex-grow text-center">Detailed Employee Progress</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-6">Employee Name</th>
              <th className="py-3 px-6">Course Name</th>
              <th className="py-3 px-6">Progress (%)</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
              >
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.course}</td>
                <td className="py-3 px-6">{item.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeProgresses;
