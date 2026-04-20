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
            🔍
          </button>
        </form>
      </div>

      <div className="nav-right">
        <div className="nav-option theme-toggle" onClick={toggleTheme}>
          <span className="nav-option-lineOne">Theme</span>
          <span className="nav-option-lineTwo">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</span>
        </div>

        <Link to="/login" className="nav-option no-underline">
          <div>
            <span className="nav-option-lineOne">
              Hello, Guest
            </span>
            <span className="nav-option-lineTwo">
              Sign In
            </span>
          </div>
        </Link>

        <Link to="/orders" className="nav-option no-underline">
          <span className="nav-option-lineOne">Returns</span>
          <span className="nav-option-lineTwo">& Orders</span>
        </Link>

        <Link to="/cart" className="nav-cart no-underline">
          <div className="cart-icon">
            <span className="cart-count">{cartCount}</span>
            🛒
          </div>
          <span className="nav-option-lineTwo cart-text">Cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;