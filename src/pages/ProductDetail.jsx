import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <div className="pdp-loading"><h2>Loading product details...</h2></div>;
  if (error) return <div className="pdp-error"><h2>{error}</h2><button onClick={() => navigate("/")}>Return to Home</button></div>;
  if (!product) return null;

  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;

  const images = product.images || [product.thumbnail];

  return (
    <div className="pdp-container">
      <div className="pdp-left">
        <div className="pdp-image-gallery">
          <div className="pdp-thumbnails">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.title} view ${index + 1}`} 
                className={`pdp-thumb ${mainImage === img ? 'active' : ''}`}
                onMouseEnter={() => setMainImage(img)}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="pdp-main-image-container">
            <img src={mainImage} alt={product.title} className="pdp-main-image" />
          </div>
        </div>
      </div>

      <div className="pdp-center">
        <div className="pdp-header">
          <p className="pdp-brand">{product.brand}</p>
          <h1 className="pdp-title">{product.title}</h1>
          {product.category && <span className="pdp-category-badge">{product.category}</span>}
          
          <div className="pdp-rating">
            <div className="stars">
              {Array(5).fill().map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-count">{product.rating ? product.rating.toFixed(1) : "0.0"} rating</span>
          </div>
        </div>

        <hr className="pdp-divider" />

        <div className="pdp-price-section">
          {product.discountPercentage > 0 && (
            <div className="pdp-discount">
              <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
              <span className="pdp-price-large">
                <span className="price-symbol">$</span>
                {Math.floor(product.price)}
                <span className="price-fraction">{(product.price % 1).toFixed(2).substring(2)}</span>
              </span>
            </div>
          )}
          {originalPrice && (
            <div className="pdp-original-price">
              Typical price: <span>${originalPrice}</span>
            </div>
          )}
        </div>

        <div className="pdp-description-section">
          <h3>About this item</h3>
          <p className="pdp-description">{product.description}</p>
        </div>
      </div>

      <div className="pdp-right">
        <div className="pdp-buy-box">
          <div className="pdp-buy-price">${product.price.toFixed(2)}</div>
          
          <div className="pdp-delivery">
            <p><strong>FREE delivery</strong> Wednesday.</p>
            <p>Order within 21 hrs 30 mins</p>
          </div>

          <div className="pdp-stock-status">
            {product.stock > 0 ? (
              product.stock < 10 ? (
                <span className="stock-low">Only {product.stock} left in stock - order soon.</span>
              ) : (
                <span className="stock-in">In Stock</span>
              )
            ) : (
              <span className="stock-out">Currently unavailable.</span>
            )}
          </div>

          <div className="pdp-actions">
            <button 
              className="pdp-btn-add" 
              onClick={handleAddToCart}
              disabled={isAdded || product.stock === 0}
            >
              {isAdded ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button 
              className="pdp-btn-buy" 
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          <div className="pdp-secure">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>Secure transaction</span>
          </div>
          
          <div className="pdp-ships-from">
            <div><span>Ships from</span> Amazon</div>
            <div><span>Sold by</span> {product.brand || "Amazon"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
