// components/ShippingPage.jsx (or app/shipping/page.jsx)

import React from 'react';
import OrderConfirmation from '../../components/OrderConfirmation';

const ShippingPage = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 bg-white font-['Inter'] text-lilshop-charcoal">
            
            <header className="text-center mb-16 md:mb-20">
                <h1 className="text-4xl md:text-6xl font-['Poppins'] font-extrabold text-lilshop-darkbrown mb-4">
                    Shipping & Delivery
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We ensure your handmade treasures from crochet to canvases are packed with care and arrive safely at your doorstep.
                </p>
            </header>

            {/* --- Key Delivery Times Card --- */}
            <div className="bg-lilshop-warm/30 p-8 rounded-xl shadow-md mb-16">
                <h2 className="text-3xl font-['Poppins'] font-bold text-lilshop-darkbrown mb-4">
                    Quick Facts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-2xl font-bold text-lilshop-darkbrown">1–3 Days</p>
                        <p className="text-sm text-gray-600 mt-1">Order Processing</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-2xl font-bold text-lilshop-darkbrown">3–5 Days</p>
                        <p className="text-sm text-gray-600 mt-1">Delivery Time (Major Cities)</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-2xl font-bold text-lilshop-darkbrown">Flat Rate</p>
                        <p className="text-sm text-gray-600 mt-1">Shipping Across Pakistan</p>
                    </div>
                </div>
            </div>

            {/* --- Detailed Policy Sections --- */}
            <div className="space-y-12">
                
                {/* 1. Processing and Handling */}
                <div>
                    <h3 className="text-2xl font-['Poppins'] font-bold text-lilshop-charcoal mb-4 border-b pb-2">
                        Processing & Packaging
                    </h3>
                    <ul className="list-disc list-outside space-y-3 pl-5 text-lg text-gray-700 font-['Inter']">
                        <li><span className='font-bold'>Processing Time:</span> All orders are processed within 1–3 business days as each item requires careful preparation.</li>
                        <li><span className='font-bold'>Handmade Notic:</span>Please note that paintings and large custom crochet orders may require a longer processing time, as specified on the individual product page.</li>
                        <li><span className='font-bold'>Packaging:</span> We use eco-friendly and secure packaging to protect delicate items during transit.</li>
                    </ul>
                </div>

                {/* 2. Shipping Rates and Tracking */}
                <div>
                    <h3 className="text-2xl font-['Poppins'] font-bold text-lilshop-charcoal mb-4 border-b pb-2">
                        Shipping Rates & Tracking
                    </h3>
                    <p className="text-xl text-lilshop-darkbrown font-semibold">
                        A single flat-rate fee of PKR 300 applies to all orders shipped across Pakistan.
                    </p>
                    <ul className="list-disc list-outside space-y-3 pl-5 text-lg text-gray-700 font-['Inter'] mt-3">
                        <li><span className='font-bold'>Tracking:</span> A tracking number will be sent to your email address once your order has been dispatched.</li>
                        <li><span className='font-bold'>Carriers:</span> We partner with trusted national couriers for reliable delivery.</li>
                    </ul>
                </div>
            </div>
            
            <div className="text-center mt-16 p-8 bg-gray-50 rounded-xl">
                 <p className="text-xl font-bold text-lilshop-charcoal">
                    Have a question? Contact us at <a href="shakiraarts15@gmail.com" className='text-lilshop-tan'>shakiraarts15@gmail.com </a>
 or via WhatsApp for quick assistance!
                 </p>
            </div>

        </div>
    );
};

export default ShippingPage;