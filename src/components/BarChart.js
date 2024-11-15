import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map(employee => employee.name),
        datasets: [
            {
                label: 'Progress (%)',
                data: data.map(employee => employee.progress),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderHeight: 2,
            
            },
        ],
    };

    return (
        <div>
            
            <Bar data={chartData} />
        </div>
        
    );
};

export default BarChart;
//