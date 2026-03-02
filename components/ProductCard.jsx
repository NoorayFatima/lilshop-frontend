// components/ProductCard.jsx

"use client"; 

import Link from "next/link";
import Image from "next/image";
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"; 

export default function ProductCard({ product, price }) {

  const { addToCart } = useCart();
  const router = useRouter();

  // Add to cart handler 
  const handleAdd = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const variantId = product?.variants?.[0]?.id;
    if (!variantId) {
      console.error("No variant available for product", product?.id || product?.handle);
      return;
    }

    try {
      const ok = await addToCart(variantId, 1);
      if (ok) router.push('/cart');
      else console.error('addToCart reported failure');
    } catch (err) {
      console.error('addToCart failed', err);
    }
  };
  
  // 1. Image Source Determination
  const imagePath = product.images?.[0]?.url || product.thumbnail;
  let finalImgSrc = "/placeholder.png"; 
  
  if (imagePath) {
    if (imagePath.startsWith('/')) {
        finalImgSrc = `${MEDUSA_URL}${imagePath}`;
    } else {
        finalImgSrc = imagePath;
    }
  }
  
  // FIXED: Ensure the link uses the handle for the app/products/[handle] route
  const productLink = `/products/${product.handle}`;
  
  // 2. Price derivation & styling
  function formatPKR(amount) {
    try {
      return new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (e) {
      return `PKR ${amount}`;
    }
  }

  function derivePrice(prod) {
    if (!prod) return "Price Unavailable";
    if (price && typeof price === "string") return price;

    const variant = prod.variants?.[0];
    if (variant) {
      const calc = variant.calculated_price;
      if (calc && typeof calc.calculated_amount === 'number') {
        return formatPKR(calc.calculated_amount);
      }

      const p = variant.prices?.find(p => p.currency_code?.toLowerCase() === 'pkr');
      if (p && typeof p.amount === 'number') {
        return formatPKR(p.amount);
      }
    }

    if (prod.price && typeof prod.price === 'string') return prod.price;

    return "Price Unavailable";
  }

  const displayPrice = derivePrice(product);
  const isPriceUnavailable = displayPrice === "Price Unavailable";
  const displayText = isPriceUnavailable ? "Pricing on request" : displayPrice;
  const priceClasses = `mt-1.5 text-sm font-bold text-lilshop-charcoal`;

  return (
    <div className="group relative transition-all duration-300 hover:shadow-2xl rounded-xl overflow-hidden border border-gray-100 bg-white">
      
      {/* 1. Image Container - Linked to Product Page */}
      <Link href={productLink} className="block w-full aspect-square bg-gray-100 relative overflow-hidden">
          <Image
            src={finalImgSrc} 
            alt={product.title}
            fill
            unoptimized={true} 
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            className="group-hover:scale-[1.05] transition duration-500 ease-in-out" 
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </Link>
      
      {/* 2. Product Details */}
      <div className="p-5 text-center flex flex-col items-center">
        <h3 className="text-base font-bold text-lilshop-charcoal truncate w-full">
          <Link href={productLink} className="hover:text-lilshop-darkbrown transition-colors duration-200">
            {product.title}
          </Link>
        </h3>
        
        <p className={priceClasses}>
          {displayText}
        </p>

        {/* 3. Action Button */}
        <button
          type="button"
          className="mt-5 w-full py-3 text-sm font-bold rounded-lg transition-all duration-300 bg-lilshop-warm text-lilshop-charcoal hover:bg-lilshop-tan transform active:scale-95 shadow-sm"
          onClick={handleAdd}
        >
          Add to Cart
        </button> 
        
        {/* Optional: Secondary "View Details" link for better UX */}
        <Link 
          href={productLink} 
          className="mt-3 text-xs font-semibold text-gray-500 hover:text-lilshop-darkbrown decoration-dotted transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}