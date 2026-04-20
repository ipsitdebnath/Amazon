import "./ProductCard.css";

function ProductCard({ id, title, price, rating, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(Math.floor(rating))
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
      </div>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
