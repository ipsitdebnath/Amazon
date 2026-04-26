import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders({ orders, user, onAddToCart }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Orders");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(order => 
    order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    order.id.includes(searchQuery)
  );

  return (
    <div className="orders-page-wrapper">
      <div className="orders-container">
        <div className="orders-breadcrumb">
          <Link to="/account">Your Account</Link> › <span className="current">Your Orders</span>
        </div>

        <div className="orders-header-top">
          <h1>Your Orders</h1>
          <div className="orders-search">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search all orders" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="search-orders-btn">Search Orders</button>
          </div>
        </div>

        <div className="orders-tabs">
          {["Orders", "Buy Again", "Not Yet Shipped", "Cancelled"].map(tab => (
            <div 
              key={tab} 
              className={`orders-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="orders-content-layout">
          <div className="orders-main">
            <div className="orders-count-filter">
              <strong>{filteredOrders.length} orders</strong> placed in 
              <select className="time-filter">
                <option>past 3 months</option>
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="no-orders-box">
                {searchQuery ? (
                  <p>No orders found matching "{searchQuery}"</p>
                ) : (
                  <>
                    <p>Looks like you haven't placed any orders yet.</p>
                    <Link to="/">
                      <button className="go-shopping-btn">Continue Shopping</button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="orders-list">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div className="order-header-left">
                        <div className="header-column">
                          <span className="label">ORDER PLACED</span>
                          <span className="value">{order.date}</span>
                        </div>
                        <div className="header-column">
                          <span className="label">TOTAL</span>
                          <span className="value">₹{Math.round(order.total)}</span>
                        </div>
                        <div className="header-column">
                          <span className="label">SHIP TO</span>
                          <span className="value link">{user ? user.name : "Guest"}</span>
                        </div>
                      </div>
                      <div className="order-header-right">
                        <div className="header-column">
                          <span className="label">ORDER # {order.id}</span>
                          <div className="header-actions">
                            <span className="link">View order details</span>
                            <span className="separator">|</span>
                            <span className="link">Invoice</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="order-card-content">
                      <div className="order-status-row">
                        <h2 className="status-delivered">Delivered</h2>
                        <p className="status-note">Package was handed to resident</p>
                      </div>

                      <div className="order-items-grid">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item-row">
                            <div className="item-main">
                              <img src={item.image} alt={item.title} className="order-item-img" />
                              <div className="item-details">
                                <Link to={`/product/${item.id}`} className="item-title">
                                  {item.title}
                                </Link>
                                <p className="return-window">Return window closed on {new Date(new Date().getTime() + 30*24*60*60*1000).toLocaleDateString()}</p>
                                <div className="item-actions">
                                  <button className="buy-again-button" onClick={() => onAddToCart(item)}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M23 4v6h-6M1 20v-6h6"></path>
                                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                                    </svg>
                                    Buy it again
                                  </button>
                                  <button className="view-item-button" onClick={() => navigate(`/product/${item.id}`)}>
                                    View your item
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="item-sidebar-actions">
                              <button className="secondary-action">Get product support</button>
                              <button className="secondary-action">Request replacement</button>
                              <button className="secondary-action">Share gift receipt</button>
                              <button className="secondary-action">Write a product review</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="order-card-footer">
                      <span className="link">Archive order</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="orders-sidebar">
            <div className="buy-it-again-sidebar">
              <h3>Buy it again</h3>
              <div className="sidebar-items">
                {orders.length > 0 && orders[0].items.slice(0, 2).map((item, i) => (
                  <div key={i} className="sidebar-item">
                    <img src={item.image} alt={item.title} />
                    <div className="sidebar-item-info">
                      <Link to={`/product/${item.id}`} className="link">{item.title}</Link>
                      <p className="price">₹{Math.round(item.price * 96)}</p>
                      <button className="add-to-cart-small" onClick={() => onAddToCart(item)}>Add to cart</button>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <p className="empty-msg">No recent items to show.</p>}
              </div>
              {orders.length > 0 && <div className="view-all-link link">View all</div>}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Orders;
