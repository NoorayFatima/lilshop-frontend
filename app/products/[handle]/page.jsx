// app/products/[handle]/page.jsx
import { getProductByHandle, getDisplayPrice } from '@/lib/data';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart';
import ImageGallery from '@/components/ImageGallery';

export default async function ProductPage({ params }) {
    const { handle } = await params;
    const product = await getProductByHandle(handle);
    if (!product) return <div className="py-20 text-center font-['Poppins']">Product not found.</div>;

    const price = getDisplayPrice(product);
    const SHIPPING_FEE = 300; 

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-16 bg-white font-['Inter']">
            {/* Minimalist Breadcrumbs */}
            <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-12 font-bold">
                <Link href="/store" className="hover:text-lilshop-darkbrown transition-colors">The Collection</Link>
                <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                <span className="text-lilshop-charcoal">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Left: Gallery (Width-controlled & Centered) */}
                <ImageGallery images={product.images} title={product.title} />

                {/* Right: Product Narrative & Details */}
                <div className="flex flex-col pt-2">
                    <header className="mb-8 border-b border-gray-100 pb-6">
                        <h1 className="text-3xl md:text-4xl font-['Poppins'] font-black text-lilshop-charcoal mb-3 tracking-tight">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <p className="text-2xl font-bold text-lilshop-darkbrown">{price}</p>
                            <span className="h-4 w-[1px] bg-gray-200"></span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pure Handmade</span>
                        </div>
                    </header>

                    <div className="mb-10 text-sm text-gray-600 leading-relaxed max-w-prose">
                        {product.description || "A masterfully curated piece from our lilshop studio, designed to blend traditional artisan skill with contemporary aesthetic appeal."}
                    </div>

                    <AddToCart product={product} />

                    {/* Creative Feature Cards: High-Contrast Dark Theme */}
                    <div className="mt-12 space-y-3">
                        <div className="relative group overflow-hidden rounded-xl bg-lilshop-darkbrown p-5 text-white transition-transform hover:-translate-y-1 duration-300 shadow-lg">
                            <div className="relative z-10 flex flex-col">
                                <span className="text-[10px] font-bold text-lilshop-warm uppercase tracking-[0.2em] mb-1">Authenticity</span>
                                <h4 className="text-sm font-bold uppercase tracking-tight">Artisan Quality Control</h4>
                                <p className="text-[11px] text-gray-300 mt-2 leading-relaxed">Every piece undergoes a rigorous manual check to ensure it meets our studio standards for craftsmanship and finish.</p>
                            </div>
                            {/* Creative Background Element */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-lilshop-warm/10 transition-colors"></div>
                        </div>

                        <div className="relative group overflow-hidden rounded-xl bg-lilshop-darkbrown p-5 text-white transition-transform hover:-translate-y-1 duration-300 shadow-lg">
                            <div className="relative z-10 flex flex-col">
                                <span className="text-[10px] font-bold text-lilshop-tan uppercase tracking-[0.2em] mb-1">Shipping</span>
                                <h4 className="text-sm font-bold uppercase tracking-tight">Secure Nationwide Logistics</h4>
                                <p className="text-[11px] text-gray-300 mt-2 leading-relaxed">Flat rate PKR {SHIPPING_FEE} delivery. Your order is carefully packaged in protective layers to arrive in pristine gallery condition.</p>
                            </div>
                            {/* Creative Background Element */}
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-lilshop-tan/10 transition-colors"></div>
                        </div>
                    </div>

                    <footer className="mt-10 pt-6 border-t border-gray-50">
                        <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest">
                            © Lilshop Studio • Premium Handmade Variety
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}