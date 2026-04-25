import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart, user, onSearch }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Calculate total items in cart (by quantity)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Fetch all products for client-side autocomplete
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Real-time search with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      const query = searchTerm.toLowerCase();
      const results = products.filter((p) => {
        return (
          (p.title && p.title.toLowerCase().includes(query)) ||
          (p.brand && p.brand.toLowerCase().includes(query)) ||
          (p.category && p.category.toLowerCase().includes(query))
        );
      });
      setSearchResults(results.slice(0, 8)); // Max 8 results
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    if (onSearch) {
      onSearch(searchTerm);
      navigate("/");
    }
  };

  const handleResultClick = (product) => {
    setShowDropdown(false);
    setSearchTerm(product.title);
    navigate(`/product/${product.id}`);
  };

  // Helper to highlight matching text
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <strong key={index} className="search-highlight">{part}</strong> 
        : part
    );
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

      <div className="nav-search" ref={dropdownRef}>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if (searchTerm.trim()) setShowDropdown(true); }}
            placeholder="Search Amazon"
          />
          <button type="submit" className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>

        {showDropdown && (
          <div className="search-dropdown">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div 
                  key={product.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(product)}
                >
                  <img src={product.thumbnail} alt={product.title} className="search-result-img" />
                  <div className="search-result-info">
                    <span className="search-result-title">
                      {highlightText(product.title, searchTerm)}
                    </span>
                    <span className="search-result-price">${product.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-result-empty">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="nav-right">
        <Link to="/login" className="nav-option no-underline">
          <span className="nav-option-lineOne">
            {user ? `Hi, ${user.name}` : "Hello, Guest"}
          </span>
          <span className="nav-option-lineTwo">
            {user ? "Account" : "Sign In"}
          </span>
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