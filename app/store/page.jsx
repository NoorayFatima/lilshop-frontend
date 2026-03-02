import React from 'react';
import ProductCard from '@/components/ProductCard'; 
import FilterSidebar from '@/components/FilterSidebar';
import { getProducts, getDisplayPrice } from '@/lib/data';

export default async function StorePage({ searchParams }) {
    // 1. Await searchParams for Next.js 15+ compatibility
    const params = await searchParams;
    
    // 2. Define activeCategory (default to 'all')
    const activeCategory = params.category || 'all';
    
    // 3. Build the query
    const query = {
        limit: 20,
        offset: params.offset ? parseInt(params.offset) : 0,
        // Only add category filter if it's a valid category ID (not 'all')
        ...(activeCategory && activeCategory !== 'all' && { category_id: [activeCategory] })
    };

    // 4. Fetch data
    const data = await getProducts(query);
    const productList = data?.products || [];

    // 5. Process products
    const processedProducts = productList.map((product) => ({
        product,
        priceString: getDisplayPrice(product)
    }));

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 bg-white font-['Inter']">
            <header className="mb-12 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-['Poppins'] font-extrabold text-lilshop-charcoal text-center">
                    The Lilshop Collection
                </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-16">
                <aside className="lg:col-span-1">
                    {/* Ensure this component is using <Link href="/store?category=handle"> */}
                    <FilterSidebar activeCategory={activeCategory} /> 
                </aside>

                <main className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                        <p className="text-sm text-gray-600 font-medium">
                            Showing {processedProducts.length} results
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-6">
                        {processedProducts.length > 0 ? (
                            processedProducts.map(({ product, priceString }) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    price={priceString} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-gray-50 rounded-xl">
                                <p className="text-xl font-semibold text-gray-400">
                                    No products found in this category yet.
                                </p>
                                <p className="text-sm text-gray-300 mt-2">
                                    Check Medusa Admin to ensure products are assigned to the "{activeCategory}" category.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}