import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ 
  id, title, price, rating, image, 
  brand, category, discountPercentage, stock, description 
}) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const originalPrice = discountPercentage 
    ? (price / (1 - discountPercentage / 100)).toFixed(2) 
    : null;

  return (
    <div className="product-card">
      {category && <span className="product-category-badge">{category}</span>}
      
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      
      <div className="product-info">
        {brand && <p className="product-brand">{brand}</p>}
        <h3 className="product-title" title={title}>{title}</h3>
        
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
            <span className="price-symbol">$</span>
            <span className="price-whole">{Math.floor(price)}</span>
            <span className="price-fraction">{(price % 1).toFixed(2).substring(2)}</span>
          </div>
          {originalPrice && (
            <span className="original-price">M.R.P.: ${originalPrice}</span>
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
