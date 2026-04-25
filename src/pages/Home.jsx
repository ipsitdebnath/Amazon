import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtering & Sorting State
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
      setProducts(data.products);
      
      // Extract unique categories for the filter
        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
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
      <div className="home-hero"></div>

      <div className="home-container">
        <div className="home-controls">
          <div className="control-group">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

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
