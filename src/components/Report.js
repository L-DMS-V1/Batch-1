import React from 'react';
import '../App.css';

const Report = ({ employeeData }) => {
    const totalEmployees = employeeData.length;
    const completedCourses = employeeData.filter(emp => emp.progress === 100).length;
    const averageProgress = employeeData.reduce((acc, emp) => acc + emp.progress, 0) / totalEmployees;

    return (
        <div>
            
            <p>Total Employees: {totalEmployees}</p>
            <p>Completed Courses: {completedCourses}</p>
            <p>Average Progress: {averageProgress.toFixed(2)}%</p>
        </div>
    );
};

export default Report;
