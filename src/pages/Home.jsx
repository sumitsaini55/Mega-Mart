import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Home({ search = "", category = "", setCategory }) {
  const HERO = "https://img.freepik.com/free-vector/grocery-store-sale-banner-template_23-2151089846.jpg";
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("https://api.escuelajs.co/api/v1/products?limit=80")
      .then((r) => r.json())
      .then((data) => {
        setItems(data || []);
        const unique = Array.from(new Set((data || []).map((d) => d.category?.name))).slice(0, 12);
        setCats(unique);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = items.filter((p) => {
    const q = (search || "").toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat = !category || p.category?.name === category;
    return matchQ && matchCat;
  });

  return (
    <>
      <section className="mx-4 mt-6">
        <div className="hero rounded-xl overflow-hidden shadow-fut-1 relative">
          <img src={HERO} alt="MegaMart banner" className="hero-img" />
          <div className="hero-overlay">
            <h1 className="text-3xl font-extrabold">MegaMart — Festival Offers</h1>
            <p className="mt-2 max-w-lg">Fresh deals on groceries, electronics and more — delivered fast.</p>
            <div className="mt-4">
              <Link to="/products" className="btn-primary">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section mx-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-sm text-slate-600">See all</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(category === c ? "" : c)}
              className={`category-pill ${category === c ? "ring-2 ring-teal-300" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="section mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Top Picks</h2>
          <div className="text-sm text-slate-600">{filtered.length} items</div>
        </div>

        {loading ? (
          <div className="py-20 text-center">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">No products found</div>
        ) : (
          <div className="product-grid">
            {filtered.slice(0, 12).map((p) => (
              <div key={p.id}>
                <ProductCard product={p} />
                <div className="mt-3 flex gap-2">
                  <button onClick={() => addToCart(p)} className="btn-accent">Add</button>
                  <Link to={`/product/${p.id}`} className="btn-primary">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
