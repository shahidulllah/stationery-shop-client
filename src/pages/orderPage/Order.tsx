/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { RootState } from "@/redux/store";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  if (status === "loading") return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Order History</h2>
      {orders.map((order, index) => (
        <div key={index} className="p-2 border-b">
          <p>Order #{index + 1}</p>
          <ul>
            {order.map((item) => (
              <li key={item.id}>{item.name} - {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
