import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOrders, updateOrderStatus } from "@/redux/slices/orderSlice";
import { toast } from "sonner";

const ManageOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, status, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await dispatch(updateOrderStatus({ orderId, newStatus }));
      toast.success(`Order ${newStatus} successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  if (status === "loading") return <p>Loading orders...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer Email</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border">
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.email}</td>
              <td className="border p-2">${order.totalPrice}</td>
              <td className="border p-2">{order.status || "Pending"}</td>
              <td className="border p-2">
                {order.status === "Pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                      onClick={() => handleUpdateStatus(order._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleUpdateStatus(order._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
