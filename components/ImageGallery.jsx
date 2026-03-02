// components/ImageGallery.jsx
"use client";
import React, { useState } from 'react';

export default function ImageGallery({ images, title }) {
    const [activeImage, setActiveImage] = useState(0);
    const validImages = images?.length > 0 ? images : [{ url: '/placeholder.png' }];

    return (
        <div className="flex flex-col gap-4 items-center">
            {/* Optimized Image Size: Max width restricted for better balance */}
            <div className="aspect-[4/5] w-full max-w-sm rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm relative group">
                <img 
                    src={validImages[activeImage].url} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Subtle, smaller thumbnails */}
            {validImages.length > 1 && (
                <div className="flex justify-center gap-2 py-2 overflow-x-auto max-w-sm">
                    {validImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                                activeImage === index ? 'border-lilshop-darkbrown' : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                        >
                            <img src={img.url} className="w-full h-full object-cover" alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}