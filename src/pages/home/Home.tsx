import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "./hero/Hero";
import Testimonials from "@/components/home/Testimonials";
import DealsAndOffers from "../../components/home/DealsAndOffers";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BlogHighlights from "@/components/home/BlogHighlight";
import ProductCategories from "@/components/home/Categories";
import ContactSupport from "@/components/home/ContactSupport";
import BrandPartners from "@/components/home/BrandPartners";
import NewsletterSignup from "@/components/home/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductCategories/>
      <FeaturedProducts />
      <DealsAndOffers />
      <WhyChooseUs />
      <BlogHighlights/>
      <Testimonials />
      <BrandPartners/>
      <ContactSupport/>
      <NewsletterSignup/>
    </div>
  );
};

export default Home;
