import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ShoppingCart, Users, DollarSign, Box } from "lucide-react";

const summaryData = [
  {
    label: "Orders",
    value: 1200,
    icon: <ShoppingCart className="text-green-600" />,
  },
  { label: "Customers", value: 530, icon: <Users className="text-blue-600" /> },
  {
    label: "Revenue",
    value: "$12,340",
    icon: <DollarSign className="text-purple-600" />,
  },
  { label: "Products", value: 98, icon: <Box className="text-orange-600" /> },
];

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
];

const recentOrders = [
  { id: "ORD001", customer: "John Doe", total: "$120", status: "Delivered" },
  { id: "ORD002", customer: "Jane Smith", total: "$75", status: "Processing" },
  { id: "ORD003", customer: "Michael Lee", total: "$230", status: "Pending" },
];

export default function AdminOverview() {
  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center space-x-4"
          >
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#0AE08F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.total}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Cart Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-10">
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
}
