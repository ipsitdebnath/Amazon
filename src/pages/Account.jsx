import React from 'react';
import './Account.css';

const Account = ({ user }) => {
  const accountOptions = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
    },
    {
      title: "Login & security",
      description: "Edit login, name, and mobile number",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    },
    {
      title: "Prime",
      description: "View benefits and payment settings",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 21V12m0 0 8-4.5M12 12l-8-4.5" /></svg>
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    },
    {
      title: "Your business account",
      description: "Sign up for free to save up to 18% with GST invoice",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    },
    {
      title: "Payment options",
      description: "Edit or add payment methods",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
    },
    {
      title: "Amazon Pay balance",
      description: "Add money to your balance",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>
    },
    {
      title: "Contact Us",
      description: "Contact our customer service via phone or chat",
      icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#232f3e" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
    }
  ];

  return (
    <div className="account-container">
      <h1>Your Account</h1>
      <div className="account-grid">
        {accountOptions.map((option, index) => (
          <div key={index} className="account-card">
            <div className="account-card-icon">{option.icon}</div>
            <div className="account-card-content">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="account-sections-grid">
        <div className="account-section">
          <h2>Digital content and devices</h2>
          <ul>
            <li>Apps and more</li>
            <li>Content Library</li>
            <li>Devices</li>
            <li>Digital gifts you've received</li>
            <li>Digital and device forum</li>
          </ul>
        </div>
        <div className="account-section">
          <h2>Email alerts, messages, and ads</h2>
          <ul>
            <li>Advertising preferences</li>
            <li>Communication preferences</li>
            <li>SMS alert preferences</li>
            <li>Message Centre</li>
            <li>Alexa shopping notifications</li>
          </ul>
        </div>
        <div className="account-section">
          <h2>More ways to pay</h2>
          <ul>
            <li>Default Purchase Settings</li>
            <li>Amazon Pay</li>
            <li>Coupons</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
