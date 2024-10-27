import React, { useState } from 'react';

const CourseAssignment = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleEmployeeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployees([...selectedEmployees, value]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(emp => emp !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Assigned course to: ${selectedEmployees.join(', ')}`);
  };

  return (
    <div className="course-assignment">
      <h3>Assign Course to Employees</h3>
      <form onSubmit={handleSubmit}>
        <label>Course Details:</label>
        <p><b>Course Name:</b> Java</p>
        <p><b>Description:</b> Basic</p>
        <p><b>Duration:</b> 2 weeks</p>
        <input type="date" required />
        <button type="submit">Assign Course</button>

        <h4>Select Employees:</h4>
        <div className="employee-list">
          <input type="checkbox" id="emp1" value="raja@gmail.com" onChange={handleEmployeeChange} />
          <label htmlFor="emp1">Raja (raja@gmail.com)</label><br />
          <input type="checkbox" id="emp2" value="ram@gmail.com" onChange={handleEmployeeChange} />
          <label htmlFor="emp2">Ram (ram@gmail.com)</label><br />
          <input type="checkbox" id="emp3" value="siva@gmail.com" onChange={handleEmployeeChange} />
          <label htmlFor="emp3">Siva (siva@gmail.com)</label>
        </div>
      </form>
    </div>
  );
};

export default CourseAssignment;
