import React, { useState } from 'react';
import './CreateRequestForm.css';
import { useNavigate } from 'react-router-dom';
import { createRequest } from './Api';

function CreateRequestForm() {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    concepts: '',
    duration: '',
    employeePosition: '',
    requiredEmployees: ''
  });
  const [message, setMessage] = useState('');

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRequest(formData);
      console.log(formData);
      if(response.data == "Request created successfully"){
        console.log(response.data)
        setMessage(response.message || 'Request created successfully');
        navigator('/manager')
      }else{
        console.log("Error : " + response.data)
        navigator('/manager')
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Request creation failed');
    }
  };

  return (
    <div className="create-request-form">
      <h2>Create Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={formData.courseName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="concepts"
          placeholder="Concepts"
          value={formData.concepts}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeePosition"
          placeholder="Employee Position"
          value={formData.employeePosition}
          onChange={handleChange}
        />
        <input
          type="number"
          name="requiredEmployees"
          placeholder="Required Employees"
          value={formData.requiredEmployees}
          onChange={handleChange}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default CreateRequestForm;
