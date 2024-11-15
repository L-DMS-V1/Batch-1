import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import CourseModification from './CourseModification';
import Report from './Report';
import '../App.css';

const EmployeeProgress = () => {
    const [employeeData, setEmployeeData] = useState([
        
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('BACKEND_API_URL'); 
                setEmployeeData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="section">
                <h2>Employee Progress Bar Chart</h2>
                <BarChart data={employeeData} />
                
            </div>
            <div className="section">
                <h2>Modify and Reassign Courses</h2>
                <CourseModification employeeData={employeeData} setEmployeeData={setEmployeeData} />
            </div>
            <div className="section engagement-report">
                <h2>Employee Engagement Report</h2>
                <Report employeeData={employeeData} />
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Assigned Course</th>
                            <th>Progress (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.course}</td>
                                <td>{employee.progress}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeProgress;
