import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(r => r.json())
      .then(data => { setProduct(data); setActiveImg(data?.images?.[0] || data?.image || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-16 text-center">Loading...</div>;
  if (!product) return <div className="py-16 text-center">Product not found.</div>;

  return (
    <div className="detail-wrap">
      <div className="detail-card fade-in">
        <div className="detail-left">
          <div className="detail-main">
            <img src={activeImg} alt={product.title} />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${activeImg === img ? "ring-2 ring-teal-300" : ""}`}
                  onClick={() => setActiveImg(img)}
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <img src={img} alt={`thumb-${idx}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <div className="detail-title">{product.title}</div>
          <div className="detail-price">₹{Math.round(product.price * 90).toLocaleString()}</div>
          <div className="category text-sm text-slate-600">Category: {product.category?.name || "N/A"}</div>
          <div className="detail-desc mt-2">{product.description}</div>

          <div className="detail-actions">
            <button className="btn-accent" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn-primary" onClick={() => { addToCart(product); alert("Checkout demo — not implemented."); }}>Buy Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
