import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import "./Home.css";

function Home({ searchTerm, onAddToCart, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtering & Sorting State
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // Shuffle products randomly (Fisher-Yates)
        const shuffled = [...data.products];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setProducts(shuffled);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  // Filter and Sort Logic
  const filteredProducts = products
    .filter((product) => {
      // Search
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Category
      if (category !== "all" && product.category !== category) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "low-to-high") return a.price - b.price;
      if (sortOrder === "high-to-low") return b.price - a.price;
      return 0; // default
    });

  if (loading) return <div className="home-loading"><h1>Loading Products...</h1></div>;
  if (error) return <div className="home-error"><h1>Error: {error}</h1></div>;

  return (
    <div className="home">
      <HeroCarousel />

      <div className="home-container">
        <div className="home-controls">
          <div className="control-group">
            <label>Sort by Price:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Featured</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className="home-row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.thumbnail}
                brand={product.brand}
                category={product.category}
                discountPercentage={product.discountPercentage}
                stock={product.stock}
                description={product.description}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="no-products">
              <h2>No products match your search.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
