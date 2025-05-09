import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";

const RelatedProducts = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 16 },
      },
    },
  });

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        You May Also Like
      </h2>
      <div ref={sliderRef} className="keen-slider">
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="keen-slider__slide bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold dark:text-white">{product.name}</h3>
              <p className="text-green-600 dark:text-green-400">
                ${product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
