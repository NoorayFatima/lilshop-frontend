// components/AddToCart.jsx
"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function AddToCart({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const router = useRouter();

    async function handleAdd() {
        // Medusa V2 requires the Variant ID to add an item to a cart
        const variantId = product.variants?.[0]?.id;

        if (!variantId) {
            console.error("No variant ID found for this product");
            return;
        }

        // Add to Medusa Cart via Context
        const success = await addToCart(variantId, quantity);
        
        if (success) {
            // Navigate to cart page so user can see their added items
            router.push('/cart');
        } else {
            alert("Failed to add item to cart. Please try again.");
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden h-14 bg-white shadow-sm">
                <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 h-full hover:bg-gray-50 transition-colors font-bold text-xl text-lilshop-charcoal"
                >
                    −
                </button>
                <span className="px-6 font-bold text-lilshop-charcoal w-16 text-center tabular-nums">
                    {quantity}
                </span>
                <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 h-full hover:bg-gray-50 transition-colors font-bold text-xl text-lilshop-charcoal"
                >
                    +
                </button>
            </div>

            {/* Add to Cart Button */}
            <button 
                onClick={handleAdd} 
                className="w-full sm:w-auto px-10 h-14 rounded-xl bg-lilshop-warm text-lilshop-charcoal font-bold shadow-lg hover:bg-lilshop-tan transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
                Add to Cart
            </button>
        </div>
    );
}