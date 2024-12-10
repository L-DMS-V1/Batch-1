import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import Navbar from './AdminNavbar';
import { getEmployeesUnderManager, getAssignedEmployees, completeRequest } from '../Api';

const CompleteRequest = () => {
  const [allEmployees, setallEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);  // To store employees already assigned to the course
  const [unassignedEmployees, setUnAssignedEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const requestData = location.state || {};

  const handleBack = () => {
    navigate('/courselist');
  };

  useEffect(() => {
    console.log("Received location state:", location.state); // Log the entire state
    console.log("Extracted course:", requestData); // Log the extracted course
  }, [location.state, requestData]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const mockAllEmployees = await getEmployeesUnderManager(requestData.manager.users.username);
        setallEmployees(mockAllEmployees);
        console.log(mockAllEmployees)
        const mockAssignedEmployees = await getAssignedEmployees(requestData.course.courseId);  // Replace with your API call
        setAssignedEmployees(mockAssignedEmployees);  // Set the assigned employees
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (allEmployees.length > 0) {
      if (assignedEmployees.length === 0) {
        // If no employees are assigned, all employees are unassigned
        setUnAssignedEmployees(allEmployees);
      } else {
        // Filter out assigned employees
        const filteredEmployees = allEmployees.filter(employee => 
          !assignedEmployees.some(assignedEmp => assignedEmp.employeeId === employee.employeeId)
        );
        setUnAssignedEmployees(filteredEmployees);  // Update the list of unassigned employees
      }
    }
  }, [allEmployees, assignedEmployees]);
  


  const handleEmployeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployees([...selectedEmployees, value]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(emp => emp !== value));
    }
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare the form data in the required format
      const courseAssignmentDTOS = selectedEmployees.map((employeeUsername) => {
        const employee = allEmployees.find(emp => emp.users.username === employeeUsername);
        return {
          employeeId: employee.employeeId,
          courseId: requestData.course.courseId,
          status: "ASSIGNED",
          deadline: deadline,
        };
      });
  
      const formData = {
        requestId: requestData.requestId,
        courseAssignmentDTOS: courseAssignmentDTOS,
      };
  
      // Call the `completeRequest` API
      console.log(formData);
      const response = await completeRequest(requestData.requestId, formData);
      if (response == "Request Completed successfully") { 
        Swal.fire("Success!", `Request completed successfully for employees: ${selectedEmployees.join(', ')}`, "success");
        navigate('/courselist');
      }else {
        Swal.fire("Unalbe to process request", "success");
        navigate('/courselist');
      }
    } catch (error) {
      console.error("Error completing request:", error);
      Swal.fire("Error!", "Failed to complete the request.", "error");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={handleBack}
          className=" px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Course Assignment Content */}
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Assign Course to Employees</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Request Details:</label>
            <p className="text-gray-600"><b>Request Id:</b> {requestData.requestId}</p>
            <p className="text-gray-600"><b>Course Name:</b> {requestData.course.courseName}</p>
            <p className="text-gray-600"><b>Manager Name:</b> {requestData.manager.users.username}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Details:</label>
            <p className="text-gray-600"><b>Course Id:</b> {requestData.course.courseId}</p>
            <p className="text-gray-600"><b>Course Name:</b> {requestData.course.courseName}</p>
            <p className="text-gray-600"><b>Key Concepts:</b> {requestData.course.keyConcepts}</p>
            <p className="text-gray-600"><b>Duration:</b> {requestData.course.duration}</p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Required Employees:</label>
            {requestData.requiredEmployees && requestData.requiredEmployees.length > 0 ? (
              <ul className="list-disc ml-5 mt-2">
                {requestData.requiredEmployees.map((employee, index) => (
                  <li key={index} className="text-gray-700">
                    {employee.users.username} {/* Update this field based on the actual structure of your employee object */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No employees assigned.</p>
            )}

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Dead Line:</label>
            <input
              type="date"
              id="start-date"
              value={deadline}
              onChange={handleDeadlineChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Select Employees:</h4>
            <div className="space-y-2">
              {unassignedEmployees.map((employee, index) => (
                <div>
                  <input
                    type="checkbox"
                    id="emp3"
                    value={employee.users.username}
                    onChange={handleEmployeeChange}
                    className="mr-2"
                  />
                  <label htmlFor="emp3" className="text-gray-700">{employee.users.username} ({employee.users.email})</label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition-colors"
          >
            Assign Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRequest;