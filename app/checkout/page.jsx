"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

const CheckoutPage = () => {
    const { cart } = useCart();
    const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
    const SHIPPING_FEE = 300; 

    const [formData, setFormData] = useState({ 
        fullName: '', 
        phone: '', 
        email: '', 
        address: '', 
        city: '', 
        province: '', 
        postalCode: '' 
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const cartId = localStorage.getItem("medusa_cart_id");
        const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY;
        
        if (!cartId || !cart) return;

        const headers = {
            "Content-Type": "application/json",
            ...(PUBLISHABLE_KEY && { "x-publishable-api-key": PUBLISHABLE_KEY }),
        };

        try {
            // 1. Update Cart with Email (Required for V2 order creation)
            await fetch(`${MEDUSA_URL}/store/carts/${cartId}`, {
                method: "POST",
                headers,
                body: JSON.stringify({ email: formData.email })
            });

            // 2. Create Payment Collection
            const collectionRes = await fetch(`${MEDUSA_URL}/store/payment-collections`, {
                method: "POST",
                headers,
                body: JSON.stringify({ cart_id: cartId }) 
            });
            const collectionData = await collectionRes.json();
            const collectionId = collectionData.payment_collection?.id;

            // 3. Initialize the Manual Payment Session
            // This is the specific step that "unlocks" the order visibility in Admin
            if (collectionId) {
                await fetch(`${MEDUSA_URL}/store/payment-collections/${collectionId}/payment-sessions`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ provider_id: "manual" })
                });
            }

            // 4. Complete the Cart
            const completeRes = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/complete`, { 
                method: "POST",
                headers
            });

            const result = await completeRes.json();
            
            // Extract order details
            const order = result.order || result.data;
            const actualId = order?.display_id || order?.id || "NEW";

            // 5. Prepare Rich WhatsApp Message
            const itemLines = cart.items.map(i => `• ${i.title} (x${i.quantity})`).join('\n');
            const total = (cart.subtotal || 0) + SHIPPING_FEE;
            
            const message = `*New Order: LilShop Studio* ✨\n\n` +
                            `*Customer:* ${formData.fullName}\n` +
                            `*Address:* ${formData.address}, ${formData.city}\n\n` +
                            `*Items Ordered:*\n${itemLines}\n\n` +
                            `*Total Payable:* PKR ${total}\n\n` +
                            `_Please share payment details for Bank/JazzCash._`;
            
            window.open(`https://wa.me/923209384504?text=${encodeURIComponent(message)}`, '_blank');

            // 6. Success Cleanup
            localStorage.removeItem("medusa_cart_id");
            window.location.href = `/products`; 

        } catch (err) { 
            console.error("Order Error:", err);
            alert("Checkout Failed: " + err.message); 
        }
    };

    if (!cart) return <div className="py-20 text-center font-['Poppins'] tracking-widest text-gray-400">PREPARING CHECKOUT...</div>;

    const subtotal = cart.subtotal || 0;
    const finalTotal = subtotal + SHIPPING_FEE;

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 font-['Inter'] bg-white">
            <header className="text-center mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-2 block">Secure Studio Checkout</span>
                <h1 className="text-4xl font-['Poppins'] font-black text-[#3f2b24]">Finalize Order</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Form Section */}
                <div className="lg:col-span-7">
                    <form onSubmit={handlePlaceOrder} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Full Name</label>
                                <input name="fullName" type="text" required onChange={handleInputChange} className="border-b border-gray-200 py-2 focus:border-[#3f2b24] outline-none transition-all bg-transparent" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">WhatsApp Number</label>
                                <input name="phone" type="tel" required onChange={handleInputChange} className="border-b border-gray-200 py-2 focus:border-[#3f2b24] outline-none transition-all bg-transparent" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Email Address</label>
                            <input name="email" type="email" required onChange={handleInputChange} className="border-b border-gray-200 py-2 focus:border-[#3f2b24] outline-none transition-all bg-transparent" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Street Address</label>
                            <input name="address" type="text" required onChange={handleInputChange} className="border-b border-gray-200 py-2 focus:border-[#3f2b24] outline-none transition-all bg-transparent" />
                        </div>

                        <div className="bg-[#3f2b24] text-white p-8 rounded-3xl mt-12 relative overflow-hidden group shadow-2xl">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2 font-['Poppins'] tracking-tight text-lilshop-warm">WhatsApp Payment</h3>
                                <p className="text-[11px] text-gray-300 leading-relaxed uppercase tracking-wider">Order details will be sent to WhatsApp. You can pay via JazzCash or Bank Transfer.</p>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-lilshop-warm/10 transition-all duration-700"></div>
                        </div>

                        <button type="submit" className="w-full py-5 bg-lilshop-warm text-[#3f2b24] font-black uppercase tracking-[0.3em] rounded-full shadow-xl hover:shadow-lilshop-warm/40 transform hover:-translate-y-1 transition-all text-xs">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5 bg-gray-50 rounded-[2.5rem] p-10 h-fit border border-gray-100 shadow-sm">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3f2b24] mb-10 border-b border-gray-200 pb-4">Order Summary</h2>
                    <div className="space-y-6 mb-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {cart.items?.map(item => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div className="max-w-[70%]">
                                    <p className="text-[11px] font-bold uppercase text-[#3f2b24] tracking-tight">{item.title}</p>
                                    <p className="text-[13px] text-gray-500 font-large">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-[11px] font-black text-[#3f2b24]">PKR {item.unit_price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-8 space-y-4">
                        <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest text-gray-500">
                            <span>Subtotal</span>
                            <span>PKR {subtotal}</span>
                        </div>
                        <div className="flex justify-between text-[12px] font-bold uppercase tracking-widest text-gray-500">
                            <span>Shipping</span>
                            <span>PKR {SHIPPING_FEE}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black text-[#3f2b24] pt-6 border-t-2 border-[#3f2b24] mt-4">
                            <span>TOTAL</span>
                            <span className="text-lilshop-darkbrown">PKR {finalTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;