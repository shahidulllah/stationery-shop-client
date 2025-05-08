// components/home/ProductCategories.tsx
import { Boxes } from "lucide-react";

const categories = [
  { name: "Writing", icon: <Boxes className="text-blue-500" /> },
  { name: "Office Supplies", icon: <Boxes className="text-green-500" /> },
  { name: "Art Supplies", icon: <Boxes className="text-pink-500" /> },
  { name: "Educational", icon: <Boxes className="text-yellow-500" /> },
  { name: "Technology", icon: <Boxes className="text-purple-500" /> },
];

const ProductCategories = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg p-5 rounded-lg hover:scale-105 transition"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
