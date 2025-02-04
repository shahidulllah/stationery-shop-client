import { NavLink, Outlet } from "react-router-dom";
import { Package, ShoppingCart, Users } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
        <nav className="space-y-4">
          <NavLink
            to="products"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <Package size={18} /> Manage Products
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <ShoppingCart size={18} /> Manage Orders
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <Users size={18} /> Manage Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
