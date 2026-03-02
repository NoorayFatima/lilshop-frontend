'use client';

// components/CategoryGrid.jsx

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Data structure for the three main categories
// each item now holds the Medusa category id used by the store page
const categories = [
  {
    title: "Crochet Collection",
    subtitle: "Stitched with love and patience.",
    categoryId: "pcat_01KGFC0RM81MBHTVDXCQQPA4B4",
    image: "/products/crochet.webp", // Place your images in /public/images
    alt: "Close-up of a cozy, textured crochet blanket or accessory",
  },
  {
    title: "Original Wall Art",
    subtitle: "Unique canvases by local artisans.",
    categoryId: "pcat_01KGFC1BC6VWAGXP7ES29AZPGN",
    image: "/products/painting.jpg",
    alt: "A vibrant, expressive painting hanging on a simple wall",
  },
  {
    title: "Sustainable Totes",
    subtitle: "Carry beauty, reduce waste.",
    categoryId: "pcat_01KGFC1X5QV9GKTV8BM81FXNM1",
    image: "/products/tote.webp",
    alt: "A stylish person carrying a hand-painted tote bag",
  },
];


const CategoryGrid = () => {
  const router = useRouter();
  return (
    // Section Container: Good padding for separation
    <section className="max-w-7xl mx-auto px-6 pb-3 md:py-12">
      
      {/* Title: Poppins, Dark Brown/Charcoal, Focused and clear */}
      <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-charcoal mb-10 md:mb-12 text-center">
        Shop By Category
      </h2>

      {/* Grid: 3-column layout on desktop, generous gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="group relative h-96 w-full rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:scale-[1.02]"
          >
            {/* Image Container: Full size, subtle zoom on hover */}
            <Image 
              src={cat.image} 
              alt={cat.alt} 
              fill 
              style={{ objectFit: "cover" }}
              className="transition-all duration-500 ease-in-out group-hover:scale-105"
            />
            
            {/* Dark Overlay for Text Readability (Dark Brown gradient) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 transition-opacity duration-300"></div>

            {/* Content Box: Anchored to the bottom for magazine feel */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
              
              {/* Title: Poppins, Large, Bold */}
              <h3 className="text-2xl font-['Poppins'] font-extrabold drop-shadow-md">
                {cat.title}
              </h3>
              
              {/* Subtitle: Inter, smaller, descriptive */}
              <p className="mt-1 text-sm font-['Inter'] drop-shadow-md">
                {cat.subtitle}
              </p>
              
              {/* CTA Button: Subtle yet clear call-to-action */}
              <button
                type="button"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  e.preventDefault(); 
                  router.push(`/store?category=${cat.categoryId}`);
                }}
                className="mt-4 px-4 py-2 text-sm font-semibold rounded-full bg-lilshop-warm text-lilshop-charcoal transition-colors duration-300 hover:bg-white"
              >
                View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;