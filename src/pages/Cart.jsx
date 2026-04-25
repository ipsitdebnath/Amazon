import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your Amazon Cart is empty.</p>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p className="cart-item-price">
                    <strong>${item.price}</strong>
                  </p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <span className="separator">|</span>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-right">
          <div className="cart-subtotal">
            <h3>
              Subtotal ({getTotalItems()} items): <strong>${getCartTotal().toFixed(2)}</strong>
            </h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
