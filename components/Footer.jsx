// components/Footer.jsx

import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-lilshop-darkbrown text-white/90 font-['Inter'] py-16 md:pt-20 md:pb-10 border-t border-lilshop-darkbrown">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Main Grid Layout --- */}
        {/* Changed to 5 columns on large screens to give the first column 40% of the space (2/5) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-16">
          
          {/* 1. Branding and Social Media: Now spans 2 columns on large screens */}
          <div className="col-span-2 lg:col-span-2 space-y-4"> 
            <h3 className="text-3xl font-['Poppins'] font-bold text-lilshop-warm">
              LilShop
            </h3>
        <div className="text-sm text-white/70 space-y-2">
        <p>
            Handcrafted in Pakistan. Art, accessories, and coziness for your everyday life. We celebrate slow craft, creating unique crochet pieces, original canvases, and stylish, sustainable tote bags for lasting joy.
        </p>
    </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/lilshop.pk?igsh=MTczM2g5ZDJ4dGdhNQ==" aria-label="Instagram" className="text-white/80 hover:text-lilshop-warm transition-colors"><FaInstagram size={20} /></a>
              <a href="https://www.facebook.com/share/1Dn67CJwH1/" aria-label="Facebook" className="text-white/80 hover:text-lilshop-warm transition-colors"><FaFacebookF size={20} /></a>
              <a href="https://pin.it/1IXjRPFM7" aria-label="Pinterest" className="text-white/80 hover:text-lilshop-warm transition-colors"><FaPinterestP size={20} /></a>
            </div>
          </div>
          
          {/* 2. Shop Links (Default col-span-1 on large screen) */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-['Poppins'] font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/store?category=pcat_01KGFC0RM81MBHTVDXCQQPA4B4" className="hover:text-lilshop-warm transition-colors">Crochet Items</Link></li>
              <li><Link href="/store?category=pcat_01KGFC1BC6VWAGXP7ES29AZPGN" className="hover:text-lilshop-warm transition-colors">Paintings</Link></li>
              <li><Link href="/store?category=pcat_01KGFC1X5QV9GKTV8BM81FXNM1" className="hover:text-lilshop-warm transition-colors">Tote Bags</Link></li>
              <li><Link href="/store" className="hover:text-lilshop-warm transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* 3. Information Links (Default col-span-1 on large screen) */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-['Poppins'] font-semibold text-white mb-4">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shipping" className="hover:text-lilshop-warm transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-lilshop-warm transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/#faq" className="hover:text-lilshop-warm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-lilshop-warm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* 4. About & Legal (Default col-span-1 on large screen) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="text-lg font-['Poppins'] font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-lilshop-warm transition-colors">Our Story</Link></li>
              <li><Link href="/policies" className="hover:text-lilshop-warm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-lilshop-warm transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/checkout" className="hover:text-lilshop-warm transition-colors">Checkout</Link></li>
            </ul>
          </div>
          
        </div>

        {/* --- Copyright and Bottom Bar --- */}
        <div className="pt-10 mt-10 border-t border-white/10 text-center md:text-left">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} lilshop. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;