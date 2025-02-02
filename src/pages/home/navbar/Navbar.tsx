import { useState } from "react";
import { Menu, Sun, Moon, X, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: <ShoppingCart />, href: "/cart" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-3">
              <img src="" alt="" />
              <h1 className="font-bold text-3xl dark:text-white">STN Crack</h1>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-lg px-3 border-b-2 transition-colors ${
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
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-black" />
              )}
            </button>
            {user ? (
              <button
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-black" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-white hover:text-primary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

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
            <button
              className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
