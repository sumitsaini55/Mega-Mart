import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch, setCategory }) {
  const [local, setLocal] = useState(search || "");
  const { cart } = useCart();
  const navigate = useNavigate();

  const doSearch = (q) => {
    setSearch(q);
    navigate("/products");
  };

  const clearAll = () => {
    setLocal("");
    setSearch("");
    setCategory("");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="logo-mark">M</div>
          <div className="text-lg font-extrabold">MegaMart</div>
        </Link>
      </div>

      <div className="flex-1 px-6">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            className="search-input"
            placeholder="Search products, categories, brands..."
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") doSearch(local); }}
          />
          <button className="btn-primary" onClick={() => doSearch(local)}>Search</button>
          <button className="ml-2 text-sm text-slate-600" onClick={clearAll}>Clear</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/products" className="text-sm font-semibold">Products</Link>
        <Link to="/cart" className="text-sm font-semibold">Cart ({cart.length})</Link>
      </div>
    </header>
  );
}
