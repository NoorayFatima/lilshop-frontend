// components/FilterSidebar.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Fallback hard-coded categories (used if API fails)
const FALLBACK_CATEGORIES = [
    { title: "All Products", id: "", subcategories: [] },
    { 
        title: "Crochet Items", 
        id: "pcat_01KGFC0RM81MBHTVDXCQQPA4B4", 
        subcategories: [
            { title: "Gajras", id: "pcat_01KGFC3WWC9DCSZS80PEQDHYV5" },
            { title: "Crochet Bags", id: "pcat_01KGFC2RD1HMPR917GPFF50HWV" },
            { title: "Flowers and Bouquet", id: "pcat_01KGFC67VF26BP3FCGRK986V52" },
            { title: "Crochet Cardigan", id: "pcat_01KGFC6SBP6X5CQH1NHYR1VFBR" },
        ]
    },
    { title: "Paintings", id: "pcat_01KGFC1BC6VWAGXP7ES29AZPGN", subcategories: [] },
    { title: "Tote Bags", id: "pcat_01KGFC1X5QV9GKTV8BM81FXNM1", subcategories: [] },
];

export default function FilterSidebar({ activeCategory }) {
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories', { cache: 'no-store' });
                const data = await response.json();
                
                // Handle both old structure (array) and new structure (object with categories property)
                const categoryList = Array.isArray(data) ? data : (data.categories || []);
                
                if (categoryList && Array.isArray(categoryList) && categoryList.length > 0) {
                    setCategories(categoryList);
                }
            } catch (error) {
                // Silently fall back to hard-coded categories on error
            }
        };

        fetchCategories();
    }, []);
    return (
        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50 sticky top-20">
            <h3 className="text-xl font-['Poppins'] font-bold text-lilshop-darkbrown mb-6 border-b pb-2">
                Browse Collection
            </h3>

            <nav className="space-y-1">
                {categories.map((cat) => {
                    const isParentActive = activeCategory === cat.id;
                    const isChildActive = cat.subcategories?.some(sub => sub.id === activeCategory);
                    const shouldShowChildren = isParentActive || isChildActive;

                    return (
                        <div key={cat.title} className="flex flex-col">
                            {/* USE ABSOLUTE PATHS TO PREVENT 404 */}
                            <Link 
                                href={cat.id ? `/store?category=${cat.id}` : '/store'}
                                className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                                    isParentActive 
                                    ? 'bg-lilshop-warm text-lilshop-charcoal font-bold shadow-sm' 
                                    : 'text-gray-600 hover:bg-white hover:text-lilshop-darkbrown'
                                }`}
                            >
                                {cat.title}
                            </Link>

                            {cat.subcategories?.length > 0 && shouldShowChildren && (
                                <div className="ml-6 mt-1 space-y-1 border-l-2 border-lilshop-tan pl-3 mb-2">
                                    {cat.subcategories.map((sub) => (
                                        <Link
                                            key={sub.id}
                                            href={`/store?category=${sub.id}`}
                                            className={`block py-1.5 text-xs transition-colors ${
                                                activeCategory === sub.id 
                                                ? 'text-lilshop-darkbrown font-bold' 
                                                : 'text-gray-500 hover:text-lilshop-darkbrown'
                                            }`}
                                        >
                                            {sub.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <Link href="/store" className="text-xs font-semibold text-lilshop-darkbrown hover:underline">
                    Clear all filters
                </Link>
            </div>
        </div>
    );
}