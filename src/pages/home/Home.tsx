import FeaturedProducts from "@/components/featuredPorducts/FeaturedProducts";
import Hero from "./hero/Hero";
import Testimonials from "@/components/testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts/>
      <Testimonials/>
    </div>
  );
};

export default Home;
