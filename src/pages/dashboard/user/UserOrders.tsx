import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOrders } from "@/redux/slices/orderSlice";

const UserOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { orders, status, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user?.email]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading your orders...
        </p>
      </div>
    );

  if (status === "failed")
    return (
      <p className="text-center mt-10 text-red-500">
        {error || "Failed to load orders."}
      </p>
    );

  const userOrders = orders?.filter((order) => order.email === user?.email);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          My Orders
        </h2>

        {userOrders?.length === 0 ? (
          <p className="text-center text-lg">No orders found.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="max-h-96 overflow-y-auto border rounded-lg shadow-md">
                <table className="w-full border-collapse text-center">
                  <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <tr>
                      <th className="p-3 border">Order ID</th>
                      <th className="p-3 border">Total Price</th>
                      <th className="p-3 border">Status</th>
                      <th className="p-3 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders?.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-3 border">{order._id}</td>
                        <td className="p-3 border text-green-600 dark:text-green-400 font-bold">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="p-3 border text-orange-600 dark:text-orange-400 font-semibold">
                          {order.status}
                        </td>
                        <td className="p-3 border">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
