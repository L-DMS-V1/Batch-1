import React, { useState,useEffect } from "react";
import Navbar from "./EmployeeNavbar";
import { useNavigate } from "react-router-dom";
import { getAssignments, getCourseProgress, updateCourseProgress,getEmployeeAssessments } from "../Api";

function EmployeePage() {
  const [isProgressDropdownOpen, setIsProgressDropdownOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isOngoingModalOpen, setIsOngoingModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [newProgressPercentage, setNewProgressPercentage] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [ongoingAssignmentsCount, setongoingAssignmentsCount] = useState(0);
  const [completedAssignmentsCount, setcompletedAssignmentsCount] = useState(0);
  const [totalAssignmentsCount, settotalAssignmentsCount] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);

  const navigator = useNavigate();


  const toggleProgressDropdown = () => {
    setIsProgressDropdownOpen(!isProgressDropdownOpen);
  };

  const toggleLearningDropdown = () => {
    setIsLearningDropdownOpen(!isLearningDropdownOpen);
  };

  const openAssignedModal = () => {
    setIsAssignedModalOpen(true);
  };

  const closeAssignedModal = () => {
    setIsAssignedModalOpen(false);
  };

  const openOngoingModal = () => {
    setIsOngoingModalOpen(true);
  };

  const closeOngoingModal = () => {
    setIsOngoingModalOpen(false);
  };

  const openCompletedModal = () => {
    setIsCompletedModalOpen(true);
  };

  const closeCompletedModal = () => {
    setIsCompletedModalOpen(false);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const mockAssignments = await getAssignments();
        setAssignments(mockAssignments);
        settotalAssignmentsCount(mockAssignments.length);
        setongoingAssignmentsCount(mockAssignments.filter(assignment => assignment.status === "ASSIGNED").length);
        setcompletedAssignmentsCount(mockAssignments.filter(assignment => assignment.status === "COMPLETED").length);
        console.log(completedAssignmentsCount);
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
      }
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const data = await getCourseProgress();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, []);

  useEffect(() => {
    const fetchEmployeeAssessments = async () => {
      try {
        const EmployeeAssessments = await getEmployeeAssessments();

        // Extract the course IDs where the result is "PASS"
        const passedCourses = EmployeeAssessments
          .filter((EmployeeAssessment) => EmployeeAssessment.result === "PASS")
          .map((EmployeeAssessment) => EmployeeAssessment.assessment.course.courseId);

        setCompletedCourses(passedCourses);
      } catch (error) {
        console.error("Error fetching employee assessments:", error);
      }
    };

    fetchEmployeeAssessments();
  }, []);

  const openUpdateModal = (progress) => {
    setSelectedProgress(progress);
    setIsUpdateModalOpen(true);
  };

  const takeAssessment = (progress) => {
    // Logic for handling the assessment action
    navigator('/takeassessment',{ state: { courseId: progress.course.courseId, employeeId: progress.employee.employeeId }});
    console.log(`Taking assessment for: ${progress.course.courseName}`);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProgress(null);
    setNewProgressPercentage("");
  };

  const handleUpdateProgress = async () => {
    if (!newProgressPercentage || isNaN(newProgressPercentage)) {
      alert("Please enter a valid progress percentage!");
      return;
    }

    const updatedProgress = {
      courseId: selectedProgress.course.courseId,
      employeeId: selectedProgress.employee.employeeId,
      progressPercentage: Number(newProgressPercentage),
      status: selectedProgress.status,
    };

    try {
      await updateCourseProgress(updatedProgress);
      alert("Progress updated successfully!");
      closeUpdateModal();
      
      // Refresh the progress data
      const updatedData = await getCourseProgress();
      setProgressData(updatedData);
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Failed to update progress!");
    }
  };

  const handleViewClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleClosePopup = () => {
    setSelectedAssignment(null);
  };


  return (
    <div className="min-h-screen bg-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Title */}
      <h2 className="text-center text-3xl font-bold mt-8">Employee Dashboard</h2>

      {/* Stats Boxes */}
      <div className="flex justify-center mt-8 space-x-4">
        <div
          className="bg-blue-200 p-6 rounded-lg w-1/4 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openAssignedModal}
        >
          <h3 className="text-lg font-semibold">Total Courses Assigned</h3>
          <p className="text-4xl font-bold">{totalAssignmentsCount}</p>
        </div>
        <div
          className="bg-green-200 p-6 rounded-lg w-1/3 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openOngoingModal}
        >
          <h3 className="text-lg font-semibold">Total Courses OnGoing</h3>
          <p className="text-4xl font-bold">{ongoingAssignmentsCount}</p>
        </div>
        <div
          className="bg-yellow-200 p-6 rounded-lg w-1/4 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
          onClick={openCompletedModal}
        >
          <h3 className="text-lg font-semibold">Total Courses Completed</h3>
          <p className="text-4xl font-bold">{completedAssignmentsCount}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-4 px-8">
        {/* My Learning Dropdown */}
        <div
          className="bg-purple-200 p-6 rounded-lg text-xl font-semibold cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          onClick={toggleLearningDropdown}
        >
          My Learning
        </div>

        {/* Learning Dropdown Content */}
        {isLearningDropdownOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-2">
          <h4 className="text-lg font-semibold">Assigned Courses</h4>
          <ul className="list-disc list-inside mt-4 space-y-2">
            {assignments.map((assignment, index) => (
              <li
              key={index}
              className="flex justify-between items-center" // Flexbox for alignment
            >
              <span>
                Course {String.fromCharCode(65 + index)} : {assignment.course.courseName}
              </span>
                <button
                  onClick={() => handleViewClick(assignment)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
        
        {/* My Progress Dropdown */}
        <div
          className="bg-blue-200 p-6 rounded-lg text-xl font-semibold cursor-pointer transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          onClick={toggleProgressDropdown}
        >
          My Progress
        </div>

          {/* Progress Dropdown Content */}
          {isProgressDropdownOpen && (
            <div className="bg-white p-4 rounded-lg shadow-lg mt-2 space-y-4">
              <h4 className="text-lg font-semibold">Course Progress</h4>
              {progressData.map((progress, index) => {
                // Define a set of colors for progress bars
                const progressColors = ["bg-green-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-purple-500"];
                const progressColor = progressColors[index % progressColors.length]; // Cycle through colors

                const isCompleted = completedCourses.includes(progress.course.courseId);

                return (
                  <div key={progress.progressId} className="mt-4">
                    <p className="text-sm font-semibold">
                      {String.fromCharCode(65 + index)}: {progress.course.courseName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className={`${progressColor} h-4 rounded-full`}
                          style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                      </div>
                      <button
                        className={`text-white px-4 py-1 rounded ${
                          isCompleted
                            ? "bg-gray-400 cursor-not-allowed"
                            : progress.progressPercentage === 100
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={isCompleted}
                        onClick={() =>
                          !isCompleted &&
                          (progress.progressPercentage === 100
                            ? takeAssessment(progress)
                            : openUpdateModal(progress))
                        }
                      >
                        {isCompleted ? "COMPLETED" : progress.progressPercentage === 100 ? "Take Assessment" : "Update"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>

      {/* Modals */}
      {isAssignedModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Assigned Courses</h3>
          <ul className="list-disc list-inside space-y-2 text-center">
            <li>Course A: Introduction to React</li>
            <li>Course B: Advanced JavaScript</li>
            <li>Course C: Tailwind CSS Basics</li>
          </ul>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={closeAssignedModal}
          >
            Close
          </button>
        </div>
      </div>
      
      )}

      {isOngoingModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Ongoing Courses</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Course D: Intermediate React</li>
              <li>Course E: JavaScript ES6+</li>
              <li>Course F: Advanced Tailwind CSS</li>
            </ul>
            <button
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={closeOngoingModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCompletedModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4">Completed Courses</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Course G: Basic HTML & CSS</li>
              <li>Course H: Git and Version Control</li>
              <li>Course I: Responsive Web Design</li>
            </ul>
            <button
              className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={closeCompletedModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

       {/* Update Modal */}
       {isUpdateModalOpen && selectedProgress && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold mb-4">
              Update Progress: {selectedProgress.course.courseName}
            </h3>
            <input
              type="number"
              placeholder="Enter new progress percentage"
              className="border border-gray-300 p-2 w-full rounded mb-4"
              value={newProgressPercentage}
              onChange={(e) => setNewProgressPercentage(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdateProgress}
              >
                Update
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeUpdateModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-Up for Course Details */}
      {selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              {selectedAssignment.course.courseName}
            </h3>
            <p><strong>KeyConcepts:</strong> {selectedAssignment.course.keyConcepts}</p>
            <p><strong>Duration:</strong> {selectedAssignment.course.duration}</p>
            <p><strong>Resource Links:</strong> {selectedAssignment.course.resourceLinks}</p>
            <p><strong>Other Links:</strong> {selectedAssignment.course.otherLinks}</p>
            <p><strong>Outcomes:</strong> {selectedAssignment.course.outcomes}</p>
            <p><strong>Deadline:</strong> {selectedAssignment.deadline}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePage;
