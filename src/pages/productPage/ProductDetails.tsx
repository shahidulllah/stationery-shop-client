import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { product, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (user) {
      if (id) {
        dispatch(addToCart({ productId: id, quantity: 1 }));
        toast.success("Product added to cart!");
      } else {
        toast.error("Product ID is missing");
      }
    } else {
      navigate("/login");
    }
  };

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-white">
          Loading product...
        </p>
      </div>
    );
  if (status === "failed")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );

  return (
    <div className="mt-16 min-h-screen py-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center items-center p-6 bg-gray-200 dark:bg-gray-700">
              {product?.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No image available
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-6">
                ${product?.price}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {product?.description}
              </p>

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Category</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {product?.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Stock</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {product?.quantity} items available
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
