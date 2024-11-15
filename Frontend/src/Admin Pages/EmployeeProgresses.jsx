import React, {useEffect, useState} from "react";
import Navbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { getAllCourseProgress } from "../Api";

const EmployeeProgresses = () => {
  const [ProgressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const data = await getAllCourseProgress();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, []);

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
            {ProgressData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
              >
                <td className="py-3 px-6">{item.employee.username}</td>
                <td className="py-3 px-6">{item.course.courseName}</td>
                <td className="py-3 px-6">{item.progressPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeProgresses;
