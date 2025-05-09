import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";

const AdminOverview = () => {
  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-[#0f0f0f] min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Admin Dashboard Overview
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Sales", value: "$12,450", icon: <DollarSign /> },
          { title: "Orders", value: "238", icon: <ShoppingCart /> },
          { title: "Products", value: "82", icon: <Package /> },
          { title: "Users", value: "1,245", icon: <Users /> },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center gap-4"
          >
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full text-green-600 dark:text-green-200">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h3 className="text-xl font-semibold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Placeholder Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500 border border-dashed rounded-md">
            {/* Integrate chart.js or recharts here */}
            Chart Placeholder
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#A123",
                  customer: "Shahid",
                  total: "$45.00",
                  status: "Delivered",
                },
                {
                  id: "#B234",
                  customer: "Ali",
                  total: "$82.50",
                  status: "Pending",
                },
                {
                  id: "#C345",
                  customer: "Sumon",
                  total: "$23.99",
                  status: "Cancelled",
                },
              ].map((order, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
        <ul className="text-sm space-y-2">
          <li>
            🛒 Items in Cart: <strong>34</strong>
          </li>
          <li>
            💰 Cart Total: <strong>$874.00</strong>
          </li>
          <li>
            📦 Products Being Restocked: <strong>5</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;
