import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ 
  id, title, price, rating, image, 
  brand, category, discountPercentage, stock, description,
  onAddToCart 
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({ id, title, price, image });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const inrPrice = price * 96;
  const originalPrice = discountPercentage 
    ? (inrPrice / (1 - discountPercentage / 100)).toFixed(2) 
    : null;

  return (
    <div className="product-card">
      
      <Link to={`/product/${id}`} className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </Link>
      
      <div className="product-info">
        {brand && <p className="product-brand">{brand}</p>}
        <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title" title={title}>{title}</h3>
        </Link>
        
        {description && <p className="product-description">{description}</p>}

        <div className="product-rating">
          {Array(5)
            .fill()
            .map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "star-filled" : "star-empty"}>
                ★
              </span>
            ))}
          <span className="rating-count">{rating ? rating.toFixed(1) : "0.0"}</span>
        </div>
        
        <div className="product-price-container">
          {discountPercentage > 0 && (
            <span className="discount-badge">-{Math.round(discountPercentage)}%</span>
          )}
          <div className="product-price">
            <span className="price-symbol">₹</span>
            <span className="price-whole">{Math.floor(inrPrice)}</span>
            <span className="price-fraction">{(inrPrice % 1).toFixed(2).substring(2)}</span>
          </div>
          {originalPrice && (
            <span className="original-price">M.R.P.: ₹{originalPrice}</span>
          )}
        </div>
        
        <div className="product-stock">
          {stock > 0 ? (
            stock < 10 ? (
              <span className="stock-low">Only {stock} left in stock - order soon.</span>
            ) : (
              <span className="stock-in">In Stock</span>
            )
          ) : (
            <span className="stock-out">Currently unavailable.</span>
          )}
        </div>
      </div>
      
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
        disabled={isAdded || stock === 0}
      >
        {isAdded ? "Added ✓" : stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
