import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  // safe price calculation: Escuelajs price * 90 (INR conversion used before)
  const subtotal = cart.reduce((sum, item) => {
    const price = item.price || (item?.variants?.[0]?.price) || 0;
    const qty = item.qty || 1;
    return sum + price * 90 * qty;
  }, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="section mx-4 text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Shop Products</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => {
            const img = (item.images && item.images[0]) || item.image || "";
            const priceINR = Math.round((item.price || 0) * 90);
            return (
              <div key={item.id} className="cart-item">
                <div className="w-28 h-24 bg-slate-50 rounded flex items-center justify-center">
                  {img ? <img src={img} alt={item.title} className="object-contain max-h-20" /> : <div className="text-sm text-slate-500">No image</div>}
                </div>

                <div className="flex-1">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-slate-600">₹{priceINR.toLocaleString()}</div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                      className="px-3 py-1 border rounded"
                      aria-label={`Decrease qty for ${item.title}`}
                    >-</button>

                    <div className="px-3">{item.qty || 1}</div>

                    <button
                      onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                      className="px-3 py-1 border rounded"
                      aria-label={`Increase qty for ${item.title}`}
                    >+</button>

                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-fut-1">
          <h3 className="text-lg font-bold">Order Summary</h3>

          <div className="mt-4 flex justify-between">
            <span>Items</span>
            <span>{cart.reduce((s, i) => s + (i.qty || 1), 0)}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">₹{Math.round(subtotal).toLocaleString()}</span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="btn-primary">Proceed to Checkout</button>
            <button className="btn-accent" onClick={clearCart}>Clear Cart</button>
            <Link to="/products" className="mt-2 text-center text-sm text-slate-600">Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
