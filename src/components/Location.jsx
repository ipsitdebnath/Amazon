import React from 'react';
import './Location.css';

const Location = ({ user }) => {
  const displayLocation = user?.location || "Pune 411015";

  return (
    <div className="nav-location">
      <div className="location-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <div className="location-text">
        <span className="location-line-one">Delivering to {displayLocation}</span>
        <span className="location-line-two">Update location</span>
      </div>
    </div>
  );
};

export default Location;
