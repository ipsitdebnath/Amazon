import { Link } from "react-router-dom";
import "./Orders.css";

function Orders({ orders }) {
  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>Looks like you haven't placed any orders yet.</h2>
          <Link to="/">
            <button className="go-shopping-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-header-left">
                  <div className="order-info-block">
                    <span>ORDER PLACED</span>
                    <strong>{order.date}</strong>
                  </div>
                  <div className="order-info-block">
                    <span>TOTAL</span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                </div>
                <div className="order-header-right">
                  <span>ORDER # {order.id}</span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${item.id}-${index}`} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div className="order-item-info">
                      <Link to={`/product/${item.id}`} className="order-item-title">
                        {item.title}
                      </Link>
                      <p className="order-item-seller">Return eligible through 30 days after delivery</p>
                      <div className="order-item-actions">
                        <button className="buy-again-btn">Buy it again</button>
                        <button className="view-item-btn">View your item</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
