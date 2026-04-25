import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CategoryBar.css";

function CategoryBar({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  const handleSelect = (cat) => {
    onSelectCategory(cat);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="category-bar">
      <div className="category-bar-inner">
        <button
          className={`category-bar-item ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => handleSelect("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-bar-item ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
