import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../Api";

function CreateRequestForm() {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    concepts: "",
    duration: "",
    employeePosition: "",
    requiredEmployees: "",
  });
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRequest(formData);
      console.log(formData);
      if (response.data == "Request created successfully") {
        console.log(response.data);
        setMessage(response.message || "Request created successfully");
        navigator("/manager");
      } else {
        console.log("Error : " + response.data);
        navigator("/manager");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Request creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-center text-2xl font-bold mb-6">Create Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Course Description"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="concepts"
              placeholder="Concepts"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.concepts}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="employeePosition"
              placeholder="Employee Position"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.employeePosition}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="requiredEmployees"
              placeholder="Required Employees"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.requiredEmployees}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRequestForm;
