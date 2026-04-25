import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

function Navbar({ onSearch }) {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  // Calculate total items in cart (by quantity)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
      navigate("/");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <div className="nav-search">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon"
          />
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>
      </div>

      <div className="nav-right">
        <div className="nav-option theme-toggle" onClick={toggleTheme}>
          <span className="nav-option-lineOne">Theme</span>
          <span className="nav-option-lineTwo">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</span>
        </div>

        <Link to="/login" className="nav-option no-underline">
          <span className="nav-option-lineOne">Hello, Guest</span>
          <span className="nav-option-lineTwo">Sign In</span>
        </Link>

        <Link to="/orders" className="nav-option no-underline">
          <span className="nav-option-lineOne">Returns</span>
          <span className="nav-option-lineTwo">& Orders</span>
        </Link>

        <Link to="/cart" className="nav-cart no-underline">
          <div className="cart-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="cart-count">{cartCount}</span>
          </div>
          <span className="nav-cart-text">Cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;