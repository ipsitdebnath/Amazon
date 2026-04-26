import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart, onClearCart, onAddOrder }) {
  const [step, setStep] = useState("address");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({ fullName: "", addressLine1: "", city: "", state: "", zip: "" });
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * 96 * item.quantity, 0);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep("summary");
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    onAddOrder(cart);
    onClearCart();
    setTimeout(() => navigate("/"), 3000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success-container">
        <div className="checkout-success-card">
          <div className="success-icon-wrapper">
            <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping with us. Your order is being processed.</p>
          <div className="success-details">
            <p><strong>Shipping to:</strong> {address.fullName}, {address.city}</p>
            <p>You will be redirected to the home page shortly...</p>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      {step === "address" ? (
        <div className="checkout-address-section">
          <h2>Shipping Address</h2>
          <form onSubmit={handleAddressSubmit} className="checkout-address-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" name="addressLine1" value={address.addressLine1} onChange={handleAddressChange} required />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={address.city} onChange={handleAddressChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <input type="text" name="state" value={address.state} onChange={handleAddressChange} required />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} required />
              </div>
            </div>
            <button type="submit" className="continue-btn">Continue to Summary</button>
          </form>
        </div>
      ) : (
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="shipping-to">
            <div>
              <strong>Shipping to:</strong> {address.fullName}, {address.addressLine1}, {address.city}, {address.state} {address.zip}
            </div>
            <button className="edit-address-btn" onClick={() => setStep("address")}>Edit</button>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>{item.title} × {item.quantity}</span>
              <span>₹{Math.round(item.price * 96 * item.quantity)}</span>
            </div>
          ))}
          <hr />
          <h3>Total: ₹{Math.round(total)}</h3>
          <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
