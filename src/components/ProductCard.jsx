import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const img = product.images?.[0] || product.image || "";
  return (
    <div className="product-card fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-thumb">
          <img src={img} alt={product.title} loading="lazy" />
        </div>
        <h3 className="product-title mt-3">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="product-price">₹{Math.round(product.price * 90).toLocaleString()}</div>
        </div>
      </Link>
    </div>
  );
}
