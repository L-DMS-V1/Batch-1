import React from 'react';

const Requests = () => (
  <div className="requests">
    <div className="request-box">
      <h3>Pending Requests</h3>
      <table>
        <thead>
          <tr>
            <th>SL No</th>
            <th>Manager Name</th>
            <th>Training Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Java</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="request-box">
      <h3>Completed Requests</h3>
      <table>
        <thead>
          <tr>
            <th>SL No</th>
            <th>Manager Name</th>
            <th>Training Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Kartick</td>
            <td>Java</td>
            <td>
              <button onClick={() => window.open('https://youtu.be/WRISYpKhIrc?si=MEcP-1LnAPSAjyO8')}>
                View Video
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Requests;
