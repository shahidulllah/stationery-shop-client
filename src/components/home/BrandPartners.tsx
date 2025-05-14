import { useState } from "react";

const brands = [
  "/images/brands/brand-1.jpeg",
  "/images/brands/brand-2.jpeg",
  "/images/brands/brand-3.jpeg",
  "/images/brands/brand-4.jpeg",
  "/images/brands/brand-5.jpeg",
  "/images/brands/brand-1.jpeg", 
  "/images/brands/brand-4.jpeg",
];

const BrandPartners = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-8 md:mb-12">
          Our Trusted Partners
        </h2>

        {/* Infinite Marquee Container */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double the brands for seamless looping */}
          <div 
            className={`flex items-center ${isPaused ? 'animation-paused' : ''}`}
            style={{
              display: 'flex',
              width: 'fit-content',
              animation: 'marquee 20s linear infinite',
            }}
          >
            {[...brands, ...brands].map((src, index) => (
              <div 
                key={`${index}-${src}`} 
                className="mx-4 md:mx-8 flex-shrink-0"
              >
                <img
                  src={src}
                  alt={`Brand ${index % brands.length + 1}`}
                  className="h-16 md:h-20 lg:h-24 rounded-lg object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for the animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animation-paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandPartners;