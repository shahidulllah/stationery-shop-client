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
      <section className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-lg mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Stationery Haven</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your one-stop destination for all your stationery needs.
        </p>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-12 max-w-7xl mx-auto">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-1 md:grid-cols-2 mb-16 lg:grid-cols-3 gap-8">
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
        <div className="text-center mt-6">
          <Link
            to="/products"
            className="bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-500 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
