import FeaturedProducts from "@/components/featuredPorducts/FeaturedProducts";
import Hero from "./hero/Hero";
import Testimonials from "@/components/testimonials/Testimonials";
import DealsAndOffers from "./dealesAndOffer/DealsAndOffers";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <DealsAndOffers/>
    </div>
  );
};

export default Home;
