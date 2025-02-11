import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOrder } from "@/redux/slices/orderSlice";

const OrderConfirmation = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { order, status, error } = useSelector(
    (state: RootState) => state.orders
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchOrder(id));
    }
  }, [dispatch, id]);

  if (!id) return <p className="text-center mt-10">Invalid Order ID.</p>;
  if (status === "loading")
    return <p className="text-center mt-10">Loading order details...</p>;
  if (status === "failed")
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Failed to load order."}
      </p>
    );
  if (!order) return <p className="text-center mt-10">Order not found.</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="text-lg">Order ID: {order._id}</p>
      <p className="text-lg">Total Amount: ${order.totalPrice.toFixed(2)}</p>
      <p className="text-lg">Payment Status: {order.paymentStatus}</p>
      <p className="text-lg">Order Status: {order.status}</p>
    </div>
  );
};

export default OrderConfirmation;
