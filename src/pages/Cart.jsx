import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, onUpdateQty, onRemove }) {
  const navigate = useNavigate();

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * 96 * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty <= 1) {
      onRemove(id);
    } else {
      onUpdateQty(id, currentQty - 1);
    }
  };

  const handleIncrease = (id, currentQty) => {
    onUpdateQty(id, currentQty + 1);
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your Amazon Cart is empty.</h2>
            <p>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics, and more.</p>
            <button className="go-shopping-btn" onClick={() => navigate("/")}>
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`} className="cart-item-title-link">
                    <h3>{item.title}</h3>
                  </Link>
                  <p className="cart-item-stock">In Stock</p>
                  <p className="cart-item-shipping">Eligible for FREE Shipping & FREE Returns</p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                    </div>
                    <span className="separator">|</span>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  <strong>₹{(item.price * 96).toFixed(2)}</strong>
                </div>
              </div>
            ))}
            <div className="cart-items-subtotal">
              Subtotal ({getTotalItems()} items): <strong>₹{getCartTotal().toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-right">
          <div className="cart-subtotal-box">
            <div className="cart-free-shipping">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#007600">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Your order qualifies for FREE Shipping.</span>
            </div>
            <h3>
              Subtotal ({getTotalItems()} items): <strong>₹{getCartTotal().toFixed(2)}</strong>
            </h3>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
