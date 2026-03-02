"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const REGION_ID = "reg_01KGFD6NQY7Q47WE8H22CEW8KY";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || "";

  const refreshCart = async () => {
    try {
      let cartId = localStorage.getItem("medusa_cart_id");
      if (!cartId) {
        const res = await fetch(`${MEDUSA_URL}/store/carts`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(PUBLISHABLE_KEY && { "x-publishable-api-key": PUBLISHABLE_KEY }) },
          body: JSON.stringify({ region_id: REGION_ID }),
        });
        const { cart } = await res.json();
        localStorage.setItem("medusa_cart_id", cart.id);
        cartId = cart.id;
      }

      const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}?fields=*items,*items.variant,*items.variant.product`, {
        headers: PUBLISHABLE_KEY ? { "x-publishable-api-key": PUBLISHABLE_KEY } : undefined,
      });
      const { cart: updatedCart } = await res.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setCart(null);
    }
  };

  useEffect(() => { refreshCart(); }, []);

  const addToCart = async (variantId, quantity = 1) => {
    try {
      const cartId = localStorage.getItem("medusa_cart_id");
      const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(PUBLISHABLE_KEY && { "x-publishable-api-key": PUBLISHABLE_KEY }) },
        body: JSON.stringify({ variant_id: variantId, quantity }),
      });
      await refreshCart();
      return true;
    } catch (err) { return false; }
  };

  // NEW: Update Quantity Function
  const updateLineItem = async (lineItemId, quantity) => {
    try {
      const cartId = localStorage.getItem("medusa_cart_id");
      if (quantity < 1) return deleteLineItem(lineItemId); // Remove if less than 1

      await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items/${lineItemId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(PUBLISHABLE_KEY && { "x-publishable-api-key": PUBLISHABLE_KEY }) },
        body: JSON.stringify({ quantity }),
      });
      await refreshCart();
    } catch (err) { console.error(err); }
  };

  // NEW: Delete Item Function
  const deleteLineItem = async (lineItemId) => {
    try {
      const cartId = localStorage.getItem("medusa_cart_id");
      await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items/${lineItemId}`, {
        method: "DELETE",
        headers: { ...(PUBLISHABLE_KEY && { "x-publishable-api-key": PUBLISHABLE_KEY }) },
      });
      await refreshCart();
    } catch (err) { console.error(err); }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, refreshCart, updateLineItem, deleteLineItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);