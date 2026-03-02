"use Client"; // Required for Next.js components using hooks
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import FeaturedProductsSection from "../components/FeaturedProducts";
import CategoryGrid from "../components/CategoryGrid";
import Footer from "@/components/Footer";
import FAQSection from '@/components/FAQsection';

const sampleProducts = [
  { id: "1", title: "Handmade Crochet Blanket", price: "79.00", image: "/products/1.png" },
  { id: "2", title: "Cozy Crochet Beanie", price: "24.00", image: "/products/2.png" },
  { id: "3", title: "Chunky Throw Pillow", price: "34.00", image: "/products/3.png" },
  { id: "4", title: "Crochet Scarf - Soft Wool", price: "29.00", image: "/products/4.png" },
  { id: "5", title: "Mini Crochet Basket", price: "18.00", image: "/products/5.png" },
  { id: "6", title: "Crochet Coasters (Set of 4)", price: "12.00", image: "/products/6.png" },
  { id: "7", title: "Handcrafted Toy - Bunny", price: "22.00", image: "/products/7.jpg" },
  { id: "8", title: "Luxury Crochet Shawl", price: "99.00", image: "/products/8.jpg" },
];

export default function Home() {
  return (
    <div className="bg-[#fffaf5] min-h-screen text-[#3f2b24]">
      
{/*-- header component was here but i removed it bcz two headers were being displayed--*/}
      <main className="container mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-['Poppins'] font-bold">
              LilShop, Art You Can Hold.
            </h1>
            <p className="mt-4 text-lg text-[#7a5a48] max-w-xl">
              Explore unique, hand-stitched accessories, original paintings, and sustainable tote bags. Created with care in Pakistan.</p>
            <div className="mt-6 flex gap-4">
              <Link href="/store" className="inline-block bg-[#6b3a2a] text-white px-6 py-3 rounded-md shadow fw-bold">
                Shop Now
              </Link>
              <Link href="/about" className="inline-block border border-[#6b3a2a] text-[#6b3a2a] px-6 py-3 rounded-md fw-bold">
                Learn More
              </Link>
            </div>
            <ul className="mt-6 flex gap-6 text-sm text-gray-600">
              <li className="border border-[#6b3a2a] text-[#6b3a2a] p-2 rounded-lg">Free shipping over $75</li>
              <li className="border border-[#6b3a2a] text-[#6b3a2a] p-2 rounded-lg">Eco-friendly materials</li>
              <li className="border border-[#6b3a2a] text-[#6b3a2a] p-2 rounded-lg">Made in small batches</li>
            </ul>
          </div>

          <div className="w-full h-72 md:h-96 relative rounded-lg overflow-hidden shadow">
            <Image src="/products/15.jfif" alt="Cozy crochet" fill style={{ objectFit: "cover" }} />
          </div>
        </section>

        <FeaturedProductsSection products={sampleProducts} />

        {/* Featured 
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>*/}

       
        <div className="rounded-lg">
          <CategoryGrid />
        </div>

        {/* Newsletter 
        <section className="mt-12 bg-white rounded-lg shadow p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold">Join our newsletter</h3>
            <p className="mt-2 text-sm text-gray-600">Get 10% off your first order and be the first to know about new drops.</p>
            <form className="mt-4 flex max-w-md mx-auto">
              <input type="email" placeholder="you@domain.com" className="flex-1 border border-gray-200 px-4 py-3 rounded-l-md" />
              <button className="bg-[#6b3a2a] text-white px-4 py-3 rounded-r-md">Subscribe</button>
            </form>
          </div>
        </section> */}
        <FAQSection />

        <section className="bg-[#fff4e6] max-w-7xl mx-auto px-6 py-16 md:py-20 rounded-xl my-16">
      <div className="text-center max-w-3xl mx-auto">
        
        {/* Headline: Poppins, Dark Brown */}
        <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-darkbrown mb-3">
          Join the lilshop Family
        </h2>
        
        {/* Sub-Text: Inter, Value Proposition */}
        <p className="text-lg text-gray-600 font-['Inter'] mb-8">
          Get exclusive early access to new crochet patterns, original paintings, and special discounts.
        </p>

        {/* Subscription Form */}
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address for newsletter"
            required
            className="w-full sm:w-80 px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-lilshop-darkbrown focus:border-lilshop-darkbrown text-lilshop-charcoal"
          />
          
          {/* CTA Button: Primary Branded Color */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 bg-lilshop-warm text-lilshop-charcoal hover:bg-lilshop-tan"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
      </main>
    </div>
  );
}
