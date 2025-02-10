import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Hero = () => {
  return (
    <div className="bg-[#373a41] dark:bg-gradient-to-r dark:from-[#121316] dark:to-[#3a3a3a] overflow-hidden flex items-center justify-center h-[500px] mt-16">
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        className="w-full"
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src="/src/assets/banner.jpg" 
            alt="Special Offer 1"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Stationery Haven
              </h1>
              <p className="text-xl mb-6">
                Discover the best stationery products for your needs.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src="/src/assets/banner-2.jpg"
            alt="Special Offer 2"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Exclusive Offers</h1>
              <p className="text-xl mb-6">
                Get up to 50% off on selected items. Limited time only!
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Explore Offers
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src="/src/assets/banner-3.jpg" 
            alt="New Arrivals"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">New Arrivals</h1>
              <p className="text-xl mb-6">
                Check out our latest collection of stationery products.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                View Collection
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
