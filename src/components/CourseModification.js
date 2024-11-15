import React, { useState } from 'react';
import '../App.css';

const CourseModification = ({ employeeData, setEmployeeData }) => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [newCourse, setNewCourse] = useState('');

    const handleReassign = () => {
        setEmployeeData(prevData => 
            prevData.map(emp => 
                emp.name === selectedEmployee ? { ...emp, course: newCourse } : emp
            )
        );
        setSelectedEmployee('');
        setNewCourse('');
    };

    return (
        <div>
            
            <label>
                Select Employee:
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                    <option value="">Select...</option>
                    {employeeData.map(emp => (
                        <option key={emp.name} value={emp.name}>{emp.name}</option>
                    ))}
                </select>
            </label>
            <label>
                New Course:
                <input 
                    type="text" 
                    value={newCourse} 
                    onChange={(e) => setNewCourse(e.target.value)} 
                    placeholder="Enter new course"
                />
            </label>
            <button onClick={handleReassign}>Reassign Course</button>
        </div>
    );
};

export default CourseModification;
