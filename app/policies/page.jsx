// components/PoliciesPage.jsx (or app/policies/page.jsx)

import Link from 'next/link'; // Still needed for internal text links (though less critical without the sidebar)
import React from 'react';

const PoliciesPage = () => {
    // Helper component for main section headers
    const PolicyHeader = ({ title }) => (
        <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-darkbrown pt-10 mt-10 border-t border-gray-200">
            {title}
        </h2>
    );

    // Helper component for sub-headers
    const SubHeader = ({ title }) => (
        <h3 className="text-xl font-['Poppins'] font-semibold text-lilshop-charcoal mt-8 mb-3">
            {title}
        </h3>
    );
    
    // Helper component for paragraph text (Ensures INTER font is used)
    const PolicyParagraph = ({ children }) => (
        <p className="mt-3 text-md font-['Inter'] text-gray-700 leading-relaxed">
            {children}
        </p>
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
            
            {/* Main Header: Centered for professional presentation */}
            <header className="text-center mb-16 md:mb-20">
                <h1 className="text-4xl md:text-6xl font-['Poppins'] font-extrabold text-lilshop-charcoal mb-4">
                    Store Policies
                </h1>
                <p className="text-base text-gray-500 font-['Inter']">
                    Last Updated: December 11, 2025
                </p>
            </header>

            {/* Main Content Area: Simplified single column structure */}
            <div className="text-left">
                
                {/* --- TERMS OF SERVICE --- */}
                <PolicyHeader title="Terms of Service" />

                <PolicyParagraph>
                    Welcome to lilshop. By accessing or using our website, you agree to comply with and be bound by these Terms.
                    Please review them carefully. These terms apply to all visitors, users, and others who access or use the Service.
                </PolicyParagraph>
                
                <SubHeader title="Product Information and Availability" />
                <PolicyParagraph>
                    All products (crochet items, paintings, and tote bags) are handmade and, therefore, may have slight variations in color, size, or appearance. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
                </PolicyParagraph>
                
                <SubHeader title="Governing Law" />
                <PolicyParagraph>
                    These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
                </PolicyParagraph>
                {/* ... (Add remaining ToS sections using SubHeader and PolicyParagraph) ... */}


                {/* --- PRIVACY POLICY --- */}
                <PolicyHeader title="Privacy Policy" />

                <PolicyParagraph>
                    Your privacy is critically important to us. This policy outlines how lilshop collects, uses, and protects any information you provide while using this website.
                </PolicyParagraph>
                
                <SubHeader title="Information We Collect" />
                <PolicyParagraph>
                    We collect information you voluntarily provide, such as your name, email address (for newsletters), and shipping address (for purchases). Payment information is processed securely by third-party payment processors and is not stored on our servers.
                </PolicyParagraph>
                
                <SubHeader title="How We Use Your Information" />
                {/* Note: Tailwind list styling requires explicit list tags if not using 'prose' */}
                <ul className="list-disc list-inside space-y-2 mt-3 text-lg text-gray-700 font-['Inter'] leading-relaxed">
                    <li>To process and fulfill your orders.</li>
                    <li>To communicate with you regarding your order status.</li>
                    <li>To send you promotional offers and updates (if you opt-in).</li>
                    <li>To improve the functionality and customer experience of our website.</li>
                </ul>
                {/* ... (Add remaining Privacy Policy sections using SubHeader and PolicyParagraph) ... */}
            </div>
        </div>
    );
};

export default PoliciesPage;