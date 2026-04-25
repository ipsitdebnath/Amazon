import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  // ---- Shared state (lives here, passed as props, synced to localStorage) ----
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("amazon_cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("amazon_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("amazon_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  // ---- LocalStorage Syncing ----
  useEffect(() => {
    localStorage.setItem("amazon_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("amazon_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("amazon_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("amazon_orders", JSON.stringify(orders));
  }, [orders]);

  // ---- Cart functions ----
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // ---- User ----
  const login = (userData) => setUser(userData);

  // ---- Orders ----
  const addOrder = (orderItems) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: orderItems,
      total: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // ---- Search ----
  const handleSearch = (term) => setSearchTerm(term);

  return (
    <Router>
      <div className="app">
        <Navbar
          cart={cart}
          user={user}
          onSearch={handleSearch}
        />
        <main className="main-content" style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} onAddToCart={addToCart} />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/cart" element={<Cart cart={cart} onUpdateQty={updateQuantity} onRemove={removeFromCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onClearCart={clearCart} onAddOrder={addOrder} />} />
            <Route path="/orders" element={<Orders orders={orders} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;