import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';  
import 'chart.js/auto';  

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Simulating an API call for now (Replace with  actual API )
        const response = await fetch('API_URL');  // Use actual API URL here
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON response, but got something else.');
        }

        const data = await response.json();
        setFeedbacks(data);
        setLoading(false); 
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch feedback data');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) => feedbacks.filter((f) => f.rating === rating).length
  );

  const chartData = {
    labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
    datasets: [
      {
        label: 'Feedback Ratings',
        data: ratingCounts,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#9c27b0'],
      },
    ],
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.feedback}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.rating}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{feedback.submittedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Feedback Rating Distribution</h2>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default FeedbackPage;
