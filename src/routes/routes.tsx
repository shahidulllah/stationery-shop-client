import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";
import About from "@/pages/aboutPage/About";
import LoginPage from "@/pages/loginPage/Login";
import RegisterPage from "@/pages/registerPage/Register";
import AllProducts from "@/pages/productPage/AllProducts";
import ProductDetails from "@/pages/productPage/ProductDetails";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import Orders from "@/pages/orderPage/Orders";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import UserDashboard from "@/pages/dashboard/user/UserDashboard";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <Orders /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // User Dashboard (Protected)
  {
    path: "/dashboard/user",
    element: <UserRoute />, 
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "orders", element: <UserOrders /> },
    ],
  },

  // Admin Dashboard (Protected)
  {
    path: "/dashboard/admin",
    element: <AdminRoute />, 
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "manage-orders", element: <ManageOrders /> },
    ],
  },
]);
