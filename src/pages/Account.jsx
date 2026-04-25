import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';
import orderingImg from '../image/Box._CB485927553_.png';
import signInImg from '../image/sign-in-lock._CB485931504_.png';
import primeImg from '../image/rc_prime._CB485926807_.png';
import addressImg from '../image/address-map-pin._CB485934183_.png';
import businessImg from '../image/amazon_business_yap_atf._CB588250268_.jpg';
import paymentsImg from '../image/Payments._CB485926359_.png';
import payBalanceImg from '../image/amazon_pay._CB485946857_.png';
import contactImg from '../image/contact_us._CB623781998_.png';

const Account = ({ user }) => {
  const navigate = useNavigate();

  const accountOptions = [
    {
      title: "Your Orders",
      description: "Track, return, or buy things again",
      icon: <img src={orderingImg} alt="Orders" width="50" />,
      link: "/orders"
    },
    {
      title: "Login & security",
      description: "Edit login, name, and mobile number",
      icon: <img src={signInImg} alt="Security" width="50" />,
      link: "/account"
    },
    {
      title: "Prime",
      description: "View benefits and payment settings",
      icon: <img src={primeImg} alt="Prime" width="50" />,
      link: "/account"
    },
    {
      title: "Your Addresses",
      description: "Edit addresses for orders and gifts",
      icon: <img src={addressImg} alt="Addresses" width="50" />,
      link: "/account"
    },
    {
      title: "Your business account",
      description: "Sign up for free to save up to 18% with GST invoice",
      icon: <img src={businessImg} alt="Business" width="50" />,
      link: "/account"
    },
    {
      title: "Payment options",
      description: "Edit or add payment methods",
      icon: <img src={paymentsImg} alt="Payment" width="50" />,
      link: "/account"
    },
    {
      title: "Amazon Pay balance",
      description: "Add money to your balance",
      icon: <img src={payBalanceImg} alt="Pay" width="50" />,
      link: "/account"
    },
    {
      title: "Contact Us",
      description: "Contact our customer service via phone or chat",
      icon: <img src={contactImg} alt="Contact" width="50" />,
      link: "/account"
    }
  ];

  return (
    <div className="account-page-wrapper">
      <div className="account-container">
        <h1>Your Account</h1>
        <div className="account-grid">
          {accountOptions.map((option, index) => (
            <div 
              key={index} 
              className="account-card" 
              onClick={() => navigate(option.link)}
              style={{ cursor: 'pointer' }}
            >
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
    </div>
  );
};

export default Account;
