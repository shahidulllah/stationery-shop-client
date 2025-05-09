import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  LogOut,
  ArrowLeft,
  Menu,
  Shapes,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const AdminDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between p-5">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5 lg:mb-8">
              <button
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="hidden lg:inline" size={20} />
                <span className="hidden lg:inline">Back to Home</span>
              </button>
              <button
                className="lg:hidden text-gray-300 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

            {/* Navigation */}
            <nav className="space-y-2">
              <NavLink
                to="overview"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition text-sm ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <Shapes size={18} /> Overview
              </NavLink>
              <NavLink
                to="manage-products"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition text-sm ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <Package size={18} /> Manage Products
              </NavLink>
              <NavLink
                to="manage-orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition text-sm ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <ShoppingCart size={18} /> Manage Orders
              </NavLink>
              <NavLink
                to="manage-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md transition text-sm ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                <Users size={18} /> Manage Users
              </NavLink>
            </nav>
          </div>

          {/* Logout */}
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-900 hover:bg-blue-700 text-white rounded-md text-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
