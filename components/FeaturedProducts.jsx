// components/FeaturedProductsSection.jsx (REVISED)

// NO "use client" directive here!

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard'; 
import { getFeaturedProducts, getDisplayPrice } from '../lib/data'; // Use the Server Component utility

// Make the component asynchronous to fetch data directly
export default async function FeaturedProductsSection() {
  
  // 1. Fetch data directly on the server
    const products = await getFeaturedProducts();
    console.log("Featured Products Data Received:", products.length, products[0]?.title);
  if (!products || products.length === 0) {
    // Return a useful message or null if no products found
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center text-gray-500 py-12">No featured products available at this time.</div>
        </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24"> 
      <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-charcoal mb-10 md:mb-12 text-center">
        Explore Our Latest Creations
      </h2>
      
      {/* Grid Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
        {products.map((p) => {
            // Compute display price (string) and pass directly
            const priceString = getDisplayPrice(p);

            return (
              <ProductCard 
                key={p.id} 
                product={p} 
                price={priceString}
              />
            );
        })}
      </div>

      <div className="text-center mt-16">
        <Link href="/store" passHref>
          <button className="px-10 py-3 text-lg border border-lilshop-darkbrown text-lilshop-darkbrown font-semibold rounded-lg transition-all duration-300 hover:text-white hover:bg-lilshop-darkbrown">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
};