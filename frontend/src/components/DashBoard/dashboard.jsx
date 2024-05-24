import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dash">

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/">Dashboard</Link>
          </div>
          <div className="navbar-links">
            <Link to="/api/users/search" className="search-btn">Search</Link>
          </div>
          <div className="navbar-links">
            <Link to="/login" className="navbar-signup-btn">Sign Up</Link>
          </div>
        </div>
      </nav>
      <div className="dashboard-content">
        <h1>I am the dashboard</h1>
      </div>
    </div>

  );
}

export default Dashboard;
