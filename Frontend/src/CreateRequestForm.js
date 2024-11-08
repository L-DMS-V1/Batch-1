import React, { useState } from 'react';
import './CreateRequestForm.css';

function CreateRequestForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    courseName: '',
    description: '',
    concepts: '',
    duration: '',
    position: '',
    employeePosition: '0'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending data to an API
    console.log(formData);
  };

  return (
    <div className="create-request-form">
      <h2>Create Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Account ID"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
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
          placeholder="Description"
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
          name="position"
          placeholder="Employee Position"
          value={formData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeePosition"
          placeholder="0"
          value={formData.employeePosition}
          onChange={handleChange}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default CreateRequestForm;
