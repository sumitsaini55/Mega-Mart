import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch, setCategory }) {
  const [local, setLocal] = useState(search || "");
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const doSearch = (q) => {
    setSearch(q);
    navigate("/products");
    setOpen(false);
  };

  const clearAll = () => {
    setLocal("");
    setSearch("");
    setCategory("");
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="logo-mark">M</div>
          <div className="text-lg font-extrabold">MegaMart</div>
        </Link>
      </div>

      {/* Search - full width on mobile */}
      <div className="flex-1 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="hidden md:flex gap-3">
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

          {/* Mobile search + menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <input
              className="search-input"
              placeholder="Search..."
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") doSearch(local); }}
            />
            <button className="p-2 rounded-md bg-teal-500 text-white" onClick={() => doSearch(local)} aria-label="search">🔍</button>
            <button className="p-2 rounded-md bg-slate-100" onClick={() => setOpen(o => !o)} aria-label="menu">☰</button>
          </div>
        </div>
      </div>

      <div className="desktop-menu">
        <Link to="/products" className="text-sm font-semibold">Products</Link>
        <Link to="/cart" className="text-sm font-semibold">Cart ({cart.length})</Link>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="mobile-menu absolute left-4 right-4 top-16 bg-white rounded-xl p-4 shadow-fut-1 z-40">
          <div className="flex flex-col gap-2">
            <Link to="/products" onClick={() => setOpen(false)} className="py-2">Products</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="py-2">Cart ({cart.length})</Link>
            <button onClick={clearAll} className="py-2 text-left">Clear Filters</button>
          </div>
        </div>
      )}
    </header>
  );
}
