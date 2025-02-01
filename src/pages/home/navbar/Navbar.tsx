/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "@/components/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  //   const [scrolled, setScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 0);
  //     };
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All products", href: "/why-us" },
    { label: "The Project", href: "/project" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      <nav
        className={`fixed bg-white dark:bg-transparent w-full top-0 z-50 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img src="" alt="" />
                <h1 className="font-bold text-3xl dark:text-white">
                  STN Crack
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[#101010] text-lg dark:text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
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
                <>
                  <button
                    className="bg-[#0AE08F] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#0AE08F] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Login Now
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#0AE08F] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Register Now
                  </Link>
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
                className="text-[#101010] dark:text-white hover:text-primary"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-bold text-3xl dark:text-white">STN shop</h1>
              <button
                onClick={closeMenu}
                className="text-[#101010] dark:text-white hover:text-primary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-[#101010] dark:text-white hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/signup"
                className="bg-[#0AE08F] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity text-center"
                onClick={closeMenu}
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
