/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/slices/productSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Get up to 6 featured products
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Stationery Haven
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your one-stop destination for all your stationery needs.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-green-500 dark:text-green-300 md:text-3xl font-bold mb-8 md:mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-md shadow hover:shadow-lg transition bg-gray-100 dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/products/${product._id}`}
                    className="text-blue-500 dark:text-blue-300 underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/products"
              className="bg-green-500 dark:bg-green-300 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-500 transition-colors duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
