"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartItem({ item }) {
    const { updateLineItem, deleteLineItem } = useCart();
    const imageUrl = item.thumbnail || '/img/placeholder.webp';
    // Link to the handle (usually nested in variant.product.handle in Medusa V2)
    const productHandle = item.variant?.product?.handle;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 py-8 border-b border-gray-100">
            {/* Image linked to Product Page */}
            <Link href={`/products/${productHandle}`} className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <img src={imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </Link>

            <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${productHandle}`}>
                    <h3 className="text-xl font-bold text-lilshop-charcoal hover:text-lilshop-darkbrown transition-colors">
                        {item.title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1 mb-4">Handcrafted Crochet Item</p>
                
                {/* Quantity Controls */}
                <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button 
                            onClick={() => updateLineItem(item.id, item.quantity - 1)}
                            className="px-3 py-1 bg-gray-50 hover:bg-lilshop-tan transition-colors border-r border-gray-200"
                        >–</button>
                        <span className="px-5 font-semibold text-lilshop-charcoal">{item.quantity}</span>
                        <button 
                            onClick={() => updateLineItem(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-50 hover:bg-lilshop-tan transition-colors border-l border-gray-200"
                        >+</button>
                    </div>
                    <button 
                        onClick={() => deleteLineItem(item.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove All
                    </button>
                </div>
            </div>

            <div className="text-right flex sm:flex-col justify-between sm:justify-center items-baseline sm:items-end w-full sm:w-auto">
                <p className="text-xl font-bold text-lilshop-darkbrown">
                    PKR {item.unit_price * item.quantity}
                </p>
                <p className="text-xs text-gray-400 ml-2 sm:ml-0">PKR {item.unit_price} each</p>
            </div>
        </div>
    );
}