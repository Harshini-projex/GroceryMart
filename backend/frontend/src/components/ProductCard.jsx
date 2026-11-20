
import React from "react";
import { Plus } from "lucide-react";

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">

      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="price">₹{product.price}</p>

        <p className="stock">
          {product.stock > 0
            ? `${product.stock} available`
            : "Out of stock"}
        </p>

        <button
          className="add-button"
          disabled={product.stock <= 0}
          onClick={() => onAdd(product)}
        >
          <Plus size={18} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
