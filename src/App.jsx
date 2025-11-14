import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <CartProvider>
      <Navbar search={search} setSearch={setSearch} setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<Home search={search} category={category} setCategory={setCategory} />} />
        <Route path="/products" element={<Products search={search} category={category} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      
    </CartProvider>
  );
}
