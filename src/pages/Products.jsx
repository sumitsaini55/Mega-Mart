import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products({ search = "", category = "" }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.escuelajs.co/api/v1/products?limit=200")
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return products.filter(p => {
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCategory = !category || p.category?.name === category;
      return matchesQ && matchesCategory;
    });
  }, [products, search, category]);

  if (loading) return <div className="py-16 text-center">Loading products...</div>;

  return (
    <div className="section mx-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <div className="text-sm text-slate-600">{filtered.length} results</div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">No products found</div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <div key={p.id}>
              <ProductCard product={p} />
              <div className="mt-3 flex gap-2">
                <button onClick={() => addToCart(p)} className="btn-accent w-full sm:w-auto">Add</button>
                <a href={`/product/${p.id}`} className="btn-primary w-full sm:w-auto text-center">View</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
