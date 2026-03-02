// components/Header.jsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles } from "lucide-react"; 

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Upper Artisan Banner */}
      <div className="bg-[#fff4e6] text-[10px] uppercase tracking-[0.3em] text-[#6b3a2a] py-2 border-b border-[#f5e6d3]">
        <div className="container mx-auto px-6 flex justify-center items-center gap-2">
          <Sparkles size={10} />
          <span>Every piece tells a story • Handmade in Pakistan</span>
          <Sparkles size={10} />
        </div>
      </div>

      {/* Glassmorphic Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-8 flex items-center justify-between">
          
          {/* Logo with Creative Typography */}
          <Link href="/" className="group flex flex-col">
            <span className="text-2xl font-['Poppins'] font-black text-[#3f2b24] tracking-tighter leading-none">
              LilShop<span className="text-lilshop-warm">.</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-gray-400 font-bold">Studio</span>
          </Link>

          {/* Minimalist Centered Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {[
              { label: 'Store', href: '/store' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className="relative text-[11px] font-black font-['Poppins'] uppercase tracking-[0.2em] text-[#3f2b24] group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lilshop-warm transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Interactive Cart Icon */}
          <Link href="/cart" className="relative p-2 group bg-[#3f2b24] rounded-full text-white hover:bg-lilshop-darkbrown transition-all duration-300 shadow-md">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-lilshop-warm text-[#3f2b24] text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}