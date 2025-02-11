import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOrder } from "@/redux/slices/orderSlice";

const OrderConfirmation = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { order, status, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrder(id));
    }
  }, [dispatch, id]);

  if (!id)
    return <p className="text-center mt-10 text-red-500">Invalid Order ID.</p>;

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading order details...
        </p>
      </div>
    );

  if (status === "failed")
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Failed to load order."}
      </p>
    );

  if (!order)
    return <p className="text-center mt-10 text-gray-600">Order not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
          🎉 Order Confirmed!
        </h2>
        <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Order ID: <span className="font-normal">{order._id}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Total Amount:{" "}
            <span className="text-green-600 dark:text-green-400 font-bold">
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Payment Status:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {order.paymentStatus}
            </span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
            Order Status:{" "}
            <span className="font-bold text-orange-600 dark:text-orange-400">
              {order.status}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/user/orders")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
