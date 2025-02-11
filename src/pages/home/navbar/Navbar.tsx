import { useState } from "react";
import { Menu, Sun, Moon, X, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products" },
    { label: "About", href: "/about" },
    {
      label: (
        <div className="relative">
          <ShoppingCart />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {cartItems.length}
            </span>
          )}
        </div>
      ),
      href: "/cart",
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-3">
          <h1 className="font-bold text-2xl sm:text-3xl dark:text-white">
            STN Crack
          </h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-lg px-3 py-2 border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-700 dark:text-white hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-black" />
            )}
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 hover:border-primary transition-colors"
              >
                <img
                  src={user?.profileImage || "/default-avatar.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                  <NavLink
                    to={
                      user.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                   Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-black" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-white hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-40 flex flex-col items-center space-y-4 py-4 md:hidden">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-lg px-3 py-2 border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-700 dark:text-white hover:text-primary"
                }`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <NavLink
                to={
                  user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"
                }
                className="text-lg px-3 py-2 border-b-2 border-transparent text-gray-700 dark:text-white hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <NavLink
                to="/login"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
