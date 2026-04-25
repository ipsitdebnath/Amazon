import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ id, title, price, rating, image }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-rating">
          {Array(5)
            .fill()
            .map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? "star-filled" : "star-empty"}>
                ★
              </span>
            ))}
          <span className="rating-count">{rating.toFixed(1)}</span>
        </div>
        <div className="product-price">
          <span className="price-symbol">$</span>
          <span className="price-whole">{Math.floor(price)}</span>
          <span className="price-fraction">{(price % 1).toFixed(2).substring(2)}</span>
        </div>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
