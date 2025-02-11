import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { clearCart, fetchCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (cartItems.length === 0)
    return (
      <div className="h-64 flex items-center justify-center text-xl text-gray-700 dark:text-gray-300">
        Your cart is empty...
      </div>
    );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Check if any product quantity exceeds stock
    const outOfStockItems = cartItems.filter(
      (item) => item?.quantity > item.product.quantity
    );

    if (outOfStockItems.length > 0) {
      toast.error(
        `Some items exceed available stock: ${outOfStockItems
          .map((item) => item.product.name)
          .join(", ")}`
      );
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {cartItems.map((item) => (
          <div
            key={item?.product?._id}
            className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item?.product?.image || "/default-product.png"}
                alt={item?.product?.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item?.product?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity: {item?.quantity}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Price: ${item?.product?.price?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {item?.product?.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item?.product?._id))}
              className="text-red-500 px-4 py-2 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-colors mt-4 sm:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Total:
            </h3>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              ${totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;