import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (id) {
      dispatch(addToCart({ productId: id, quantity: 1 }));
      toast.success("Product added to cart!");
    } else {
      toast.error("Product ID is missing");
    }
  };

  if (status === "loading")
    return (
      <p className="text-center text-gray-700 dark:text-white">
        Loading product...
      </p>
    );
  if (status === "failed")
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-screen py-40 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto  p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {product?.image && (
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-64 object-cover rounded-md"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{product?.name}</h1>
        <p className="text-xl font-semibold text-green-600 dark:text-green-400 mt-2">
          ${product?.price}
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {product?.description}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
