// components/AboutUsPage.jsx (or app/about/page.jsx)

import Link from 'next/link';
import Image from 'next/image';
import { FaThreads, FaPaintbrush, FaLeaf } from 'react-icons/fa6';
// NOTE: Ensure you have react-icons installed for the following icons

const GuidingPrinciplesData = [
  {
    title: "Slow Craft",
    description: "We reject fast fashion, focusing on durable, handmade quality that stands the test of time.",
    Icon: FaThreads, // Represents stitching/thread
  },
  {
    title: "Local Artistry",
    description: "Proudly crafted in Pakistan, celebrating local skills, traditions, and unique creativity.",
    Icon: FaPaintbrush, // Represents painting/art
  },
  {
    title: "Conscious Creation",
    description: "Mindful sourcing of materials for beautiful products that are also kind to the planet.",
    Icon: FaLeaf, // Represents sustainability
  },
];

const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 font-['Inter'] text-lilshop-charcoal">
      
      {/* 1. Hero Section: Personal & Impactful */}
      <section className="text-center mb-20 md:mb-32">
        <h1 className="text-5xl md:text-7xl font-['Poppins'] font-extrabold text-lilshop-darkbrown leading-tight">
          Stitched, Painted, Created.
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
          We are lilshop, a passion project born in Pakistan, dedicated to the art of slow craft and lasting beauty.
        </p>
      </section>

      {/* 2. Meet the Artisan (Visual Asymmetry) */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
        <div className="md:order-1 relative h-96 w-full rounded-xl overflow-hidden shadow-2xl">
          {/* REPLACE with your founder's image */}
          <Image 
            src="/products/14.jfif" 
            alt="Portrait of the founder and artisan of lilshop"
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="md:order-2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold text-lilshop-charcoal">
            The Hands Behind the Art
          </h2>
          <p className="text-lg text-gray-700">
            Hi, I’m Shakira, and lilshop is my commitment to creating meaningful, unique items. It started with a single crochet hook and a desire to bring long-lasting quality into a fast-paced world. Every stitch, every brushstroke, and every thread is infused with local Pakistani artistry and a profound love for the craft.
          </p>
          <p className="text-lg font-bold text-lilshop-darkbrown">
            "It's not just a product; it's a piece of my story, ready to become a part of yours."
          </p>
        </div>
      </section>
      
      {/* 3. GUIDING PRINCIPLES SECTION (Integrated & Dark Background) */}
<section className="bg-[#fff4e6] py-20 md:py-28 text-white -mx-6 sm:mx-0 rounded-xl">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Title: Uses the warmer tan against the dark background */}
          <h2 className="text-4xl md:text-5xl font-['Poppins'] font-extrabold text-lilshop-darkbrown text-center mb-4">
            Our Guiding Principles
          </h2>
          
          {/* Sub-Title / Descriptor */}
          <p className="text-base text-black text-center font-['Inter'] mb-16">
            The three commitments that define every piece we create at lilshop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GuidingPrinciplesData.map((principle, index) => (
              
              // Card: Now uses the light, warm tan color for maximum pop against the dark BG
              <div 
                key={index} 
                className="group bg-lilshop-warm p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
              >
                <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-lilshop-warm/50">
                   {/* Icon: Uses the dark brand color for contrast on the light background */}
                   <principle.Icon size={36} className="text-lilshop-darkbrown" />
                </div>

                {/* Title: Uses the dark brand color */}
                <h3 className="text-xl font-['Poppins'] font-bold text-lilshop-darkbrown mt-4 mb-2">
                  {principle.title}
                </h3>
                
                {/* Description: Uses the charcoal text for readability */}
                <p className="text-sm font-['Inter'] text-lilshop-charcoal">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. Final CTA */}
      <section className="text-center pt-20">
        <p className="text-xl text-lilshop-darkbrown mb-6">
          Ready to find your unique piece?
        </p>
        <Link 
          href="/store" 
          className="px-10 py-4 text-xl font-semibold rounded-lg shadow-lg transition-all duration-300 text-lilshop-charcoal bg-lilshop-warm hover:bg-lilshop-tan"
        >
          Explore Our Collection
        </Link>
      </section>

    </div>
  );
};

export default AboutUsPage;