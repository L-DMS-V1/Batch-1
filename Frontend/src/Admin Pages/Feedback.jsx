import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFeedbacks } from '../Api';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from './AdminNavbar';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null); // State for chart data

  const navigator = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Simulating an API call for now (Replace with actual API)
        const response = await getAllFeedbacks(); // Use actual API call here
        setFeedbacks(response);

        // Dynamically create chart data from API response
        const ratingCounts = [1, 2, 3, 4, 5].map(
          (rating) => response.filter((f) => f.rating === rating).length
        );

        const data = {
          labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
          datasets: [
            {
              label: 'Feedback Ratings',
              data: ratingCounts,
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#9c27b0'],
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch feedback data');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBack = () => {
    navigator('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Back and Add Course Buttons */}
        <div className="p-6 space-x-4">
        <button
          onClick={handleBack}
          className="mb-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Feedbacks:</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Submitted By</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.feedbackId}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.feedbackId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.comment}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.rating}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.employee?.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.course?.courseName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Feedback Rating Distribution</h2>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {chartData && <Pie data={chartData} />}
      </div>
    </div>
    </div>
  );
};

export default FeedbackPage;
