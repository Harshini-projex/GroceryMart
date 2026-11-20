
import React, { useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";

function ProductList({ products, onAdd }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Snacks",
    "Beverages"
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products-section" id="products">

      <span className="tag">OUR STORE</span>
      <h2>Shop Groceries</h2>
      <p>Everything you need in one place.</p>

      <div className="search-box">
        <Search size={20} />

        <input
          placeholder="Search groceries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty">No products found.</p>
      )}

    </section>
  );
}

export default ProductList;
