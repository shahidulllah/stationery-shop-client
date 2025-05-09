import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";

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
    <div className="mt-16 min-h-screen py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              {product?.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No image available
                </p>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                  ${product?.price}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
                  {product?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Brand</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product?.brand || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Category</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product?.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">In Stock</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product?.quantity} items
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">SKU</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      STN-{product?._id?.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Delivery</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Within 3-5 business days
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Return Policy</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      7-day easy return
                    </p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 font-semibold shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      <ProductReviews/>
      <RelatedProducts/>
      </div>
    </div>
  );
};

export default ProductDetails;
