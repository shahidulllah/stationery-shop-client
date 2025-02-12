import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOrders, updateOrderStatus } from "@/redux/slices/orderSlice";
import { toast } from "sonner";
import { AppWindow, CropIcon} from "lucide-react";

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

  if (status === "loading")
    return <p className="text-center text-lg">Loading orders...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
        Manage Orders
      </h2>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded-lg shadow-md">
        <table className="min-w-full border-collapse border dark:border-gray-700 text-left">
          <thead className="bg-gray-800 dark:bg-gray-700 text-white sticky top-0">
            <tr>
              <th className="border p-3 text-center">Order ID</th>
              <th className="border p-3 text-center">Customer Email</th>
              <th className="border p-3 text-center">Total Price</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="border dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <td className="border p-3 text-center">{order._id}</td>
                <td className="border p-3 text-center">{order.email}</td>
                <td className="border p-3 text-center">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="border p-3 text-center">
                  <span
                    className={`px-2 rounded-full text-sm font-medium ${
                      order.status === "Processing"
                        ? "bg-yellow-500 text-white"
                        : order.status === "Approved"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border p-3 flex gap-2 justify-center">
                  {order.status === "Processing" && (
                    <>
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-md transition-all flex items-center gap-1"
                        onClick={() =>
                          handleUpdateStatus(order._id, "Approved")
                        }
                      >
                        <AppWindow size={16} /> Approve
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-md transition-all flex items-center gap-1"
                        onClick={() =>
                          handleUpdateStatus(order._id, "Rejected")
                        }
                      >
                       <CropIcon size={16}/> Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
