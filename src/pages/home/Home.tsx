import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "./hero/Hero";
import Testimonials from "@/components/home/Testimonials";
import DealsAndOffers from "../../components/home/DealsAndOffers";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <DealsAndOffers/>
      <WhyChooseUs/>
      <Testimonials />
    </div>
  );
};

export default Home;
