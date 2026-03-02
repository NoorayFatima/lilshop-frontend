// components/FAQSection.jsx

"use client"; // Required for state management (Accordion functionality)

import React, { useState } from 'react';
import Link from 'next/link';

// Data for the most common, high-impact FAQs
const FAQ_DATA = [
  {
    question: "How long will my order take to arrive?",
    answer: (
      <>
        All our items are handcrafted and processed within 1–3 business days. Delivery within major Pakistani cities typically takes an additional **3–5 business days**. For full details, please visit our{' '}
        <Link href="/shipping" className="text-lilshop-darkbrown font-semibold hover:underline">Shipping & Delivery Page</Link>.
      </>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer: (
      <>
        We currently process all payments securely via WhatsApp. After placing your order, you will be redirected to a confirmation page with a direct link and bank/wallet details to complete your payment.
      </>
    ),
  },
  {
    question: "Can I return or exchange a handmade item?",
    answer: (
      <>
        Due to the unique, handmade nature of our products, exchanges are evaluated on a case-by-case basis. We do not offer refunds. For details on exceptions and the process, please review our{' '}
        <Link href="/returns" className="text-lilshop-darkbrown font-semibold hover:underline">Returns & Exchanges Policy</Link>.
      </>
    ),
  },
  {
    question: "Are your crochet items machine washable?",
    answer: (
      <>
        We recommend handwashing all crochet products in cold water with mild detergent and laying them flat to dry to maintain their shape and integrity.
      </>
    ),
  },
];

// Helper Component for the Accordion Item
const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center py-5 text-left font-['Poppins'] font-semibold text-lg text-lilshop-charcoal hover:text-lilshop-darkbrown transition-colors"
        >
            {question}
            {/* Plus/Minus icon */}
            <span className="text-xl text-lilshop-darkbrown">
                {isOpen ? '—' : '+'}
            </span>
        </button>
        {/* Answer Content: Uses transition for smooth open/close */}
        <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 pb-5' : 'max-h-0'}`}
        >
            <p className="text-base text-gray-700 font-['Inter'] leading-relaxed bg-lilshop-warm/10 p-4 rounded-lg">
                {answer}
            </p>
        </div>
    </div>
);


const FAQsection = () => {
  // State to track which item is open (null for none open)
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Section Container: Simple white/light gray background for the homepage
    <section id="faq" className="max-w-4xl mx-auto px-6 py-16 md:py-24 bg-[#fff4e6] rounded-lg shadow-md">
      
      <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-darkbrown text-center mb-12">
        Frequently Asked Questions
      </h2>

      {/* Accordion List */}
      <div className="border-t border-gray-200">
        {FAQ_DATA.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Footer link to a hypothetical full FAQ page if needed in the future */}
      <div className="text-center mt-12 space-y-4">
        <p className="text-lg text-gray-700">
          Didn't find your answer? <Link href="/contact" className="text-lilshop-darkbrown font-semibold hover:underline">Contact us directly</Link>.
        </p>
        <a href="mailto:shakiraarts15@gmail.com" aria-label="Email shakira" className="inline-block px-6 py-2 bg-lilshop-warm text-lilshop-charcoal rounded-md font-semibold hover:bg-lilshop-tan">Email Us</a>
      </div>
      
    </section>
  );
};

export default FAQsection;