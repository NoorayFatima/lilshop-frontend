// components/OrderConfirmation.jsx (or app/order/confirmed/[id]/page.jsx)

import Link from 'next/link';
import React from 'react';
import { FaWhatsapp, FaCheck, FaMoneyBillWave } from 'react-icons/fa6'; 
// NOTE: Ensure you have react-icons installed

// This component would typically run on a dynamic route: /order/confirmed/[orderId]
const OrderConfirmation = ({ orderId }) => {
    // Conceptual placeholder data (In reality, fetch from Medusa using orderId)
    const orderData = {
        id: orderId || 'LIL-2025-00123',
        total: 3500, // PKR
        whatsappNumber: '03XX-XXXXXXX', // Your business WhatsApp number
        date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    
    // Generates the WhatsApp pre-filled chat link
    const whatsappMessage = `Hello lilshop! I am ready to pay for my Order ID: ${orderData.id}. The total amount is PKR ${orderData.total}.`;
    const whatsappLink = `https://wa.me/${orderData.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 bg-white font-['Inter']">
            
            {/* 1. Success Header */}
            <header className="text-center mb-16 md:mb-20 p-8 border border-lilshop-darkbrown/30 rounded-xl bg-lilshop-warm/30">
                <FaCheck className="mx-auto text-6xl text-lilshop-darkbrown mb-4" />
                <h1 className="text-4xl md:text-5xl font-['Poppins'] font-extrabold text-lilshop-darkbrown mb-3">
                    Thank You! Order Placed.
                </h1>
                <p className="text-xl text-lilshop-charcoal font-semibold">
                    Your Order ID is: <span className="font-extrabold">{orderData.id}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">Placed on {orderData.date}</p>
            </header>

            {/* 2. WhatsApp Payment Instructions (Main Focus) */}
            <section className="bg-lilshop-darkbrown p-10 rounded-xl shadow-2xl text-white mb-16">
                <h2 className="text-3xl font-['Poppins'] font-extrabold text-lilshop-warm mb-6 text-center">
                    Final Step: Complete Your Payment
                </h2>
                <p className="text-lg text-white/90 text-center mb-8">
                    To finalize your handmade treasures, please complete the payment via WhatsApp.
                </p>

                {/* Step-by-Step Guide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    
                    {/* Step 1 */}
                    <div className="p-4 bg-white rounded-lg text-lilshop-charcoal">
                        <FaWhatsapp className="mx-auto text-3xl text-green-600 mb-2" />
                        <h3 className="font-['Poppins'] font-bold text-xl mb-1">1. Click to Chat</h3>
                        <p className="text-sm">Use the green button below to open a direct chat.</p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="p-4 bg-white rounded-lg text-lilshop-charcoal">
                        <FaMoneyBillWave className="mx-auto text-3xl text-lilshop-darkbrown mb-2" />
                        <h3 className="font-['Poppins'] font-bold text-xl mb-1">2. Confirm Total</h3>
                        <p className="text-sm">The pre-filled message includes your order total of PKR {orderData.total}.</p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="p-4 bg-white rounded-lg text-lilshop-charcoal">
                        <FaCheckCircle className="mx-auto text-3xl text-lilshop-warm mb-2" />
                        <h3 className="font-['Poppins'] font-bold text-xl mb-1">3. Receive Details</h3>
                        <p className="text-sm">Our team will instantly share our bank details/wallet number.</p>
                    </div>

                </div>
                
                {/* Primary CTA: WhatsApp Link */}
                <div className="text-center mt-10">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <button
                            className="flex items-center justify-center mx-auto px-10 py-3 text-xl font-semibold rounded-lg shadow-xl transition-all duration-300 bg-green-600 text-white hover:bg-green-700"
                        >
                            <FaWhatsapp className="mr-3 text-2xl" />
                            Pay PKR {orderData.total} via WhatsApp
                        </button>
                    </a>
                </div>
                
            </section>
            
            {/* 3. Final Reassurance */}
            <section className="text-center text-lg text-lilshop-charcoal">
                <p className="mb-4">
                    Your order is currently **AWAITING PAYMENT**. Once confirmed via WhatsApp, we will begin the 1–3 day processing period.
                </p>
                <p className="text-sm text-gray-500">
                    A detailed confirmation email has also been sent to your inbox.
                </p>
            </section>

        </div>
    );
};

export default OrderConfirmation;