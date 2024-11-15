import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, getCourse } from '../Api';
import Navbar from './AdminNavbar';

const CourseList = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const mockAllCourses = await getAllCourses();
        setAllCourses(mockAllCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleBack = () => {
    navigator('/admin');
  };

  const handleAddCourse = () => {
    navigator('/addcourse');
  };

  const handleCreateCourse = () => { 
    navigator('/createCourse', { state: { requestId: requestData.requestId } });
  };

  const handleEditCourse = async (course) => {
    try {
      const courseData = await getCourse(course.courseId); // Call API handler with courseId
      navigator('/editCourse', { state: { course } }); // Pass data to the route
    } catch (error) {
      console.error("Failed to fetch course details:", error);
    }
  };

  const handleAddLearners = (courseId) => {
    navigator(`/addlearners/${courseId}`);
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
  };

  const closeCard = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Back and Add Course Buttons */}
      <div className="p-6 space-x-4">
        <button
          onClick={handleBack}
          className="mb-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
        <button
          onClick={handleAddCourse}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Course
        </button>
      </div>
      
      {/* Course List Content with Grid Layout */}
      <div className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Course List</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCourses.map((course, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
              <h4 className="text-lg font-medium text-gray-800 mb-2">{course.courseName}</h4>
              <p className="text-gray-600">{course.keyConcepts}</p>
              <p className="text-gray-600">{course.duration}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditCourse(course)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleAddLearners(course)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Add Learners
                </button>
                <button
                  onClick={() => handleViewCourse(course)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg rounded-md w-11/12 md:w-2/3 lg:w-1/2 transform translate-y-0 transition-transform duration-300 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeCard}
            >
              &times;
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Course Details</h2>
            </div>
            <p><strong>Course Name:</strong> {selectedCourse.courseName}</p>
            <p><strong>Key Concepts:</strong> {selectedCourse.keyConcepts}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Resource Links:</strong> {selectedCourse.resourceLinks}</p>
            <p><strong>Other Links:</strong> {selectedCourse.otherLinks}</p>
            <p><strong>Outcomes:</strong> {selectedCourse.outcomes}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseList;
