import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, ArrowLeft, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 w-64 bg-gray-800 text-white p-5 transform ${
          isSidebarOpen ? "translate-x-0 min-h-screen" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-5">
          <button
            className="flex items-center gap-2 text-gray-300 hover:text-white"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="hidden lg:flex" size={20} />{" "}
            <span className="hidden lg:flex">Back to Home</span>
          </button>
          <button
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <button
          className="flex lg:hidden mb-8 items-center gap-2 text-gray-300 hover:text-white"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} /> <span>Back to Home</span>
        </button>

        <h2 className="text-xl font-bold mb-5">User Dashboard</h2>

        {/* Navigation */}
        <nav className="space-y-4">
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded transition ${
                isActive ? "bg-green-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <ShoppingCart size={20} /> My Orders
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded transition ${
                isActive ? "bg-green-600 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            <User size={20} /> Profile
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-5 left-5 right-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 bg-green-900 hover:bg-green-700 text-white rounded"
          >
            <LogOut size={20} /> Logout
          </button>
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
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
