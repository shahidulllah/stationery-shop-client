import { Link } from "react-router-dom";

const Testimonials = () => {
  return (
    <>
      {/* Testimonials Section */}
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Stationery Haven has the best collection of stationery products.
              Highly recommended!"
            </p>
            <p className="mt-4 font-semibold">- Hasibul Islam</p>
          </div>

          {/* Testimonial 2 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "I love the quality and variety of products. Fast delivery too!"
            </p>
            <p className="mt-4 font-semibold">- Jahirul Balam</p>
          </div>

          {/* Testimonial 3 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Great customer service and amazing products. Will definitely shop
              again!"
            </p>
            <p className="mt-4 font-semibold">- Salman Khan</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog 1 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">
              Top 10 Stationery Must-Haves
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Discover the essential stationery items every student and
              professional needs.
            </p>
            <Link
              to="#"
              className="text-blue-500 dark:text-blue-300 underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>

          {/* Blog 2 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">Organize Your Workspace</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Tips and tricks to create a productive and organized workspace.
            </p>
            <Link
              to="#"
              className="text-blue-500 dark:text-blue-300 underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>

          {/* Blog 3 */}
          <div className="border p-6 rounded-md shadow bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2">Eco-Friendly Stationery</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Explore sustainable and eco-friendly stationery options.
            </p>
            <Link
              to="#"
              className="text-blue-500 dark:text-blue-300 underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
