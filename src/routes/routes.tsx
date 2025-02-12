import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";
import About from "@/pages/aboutPage/About";
import LoginPage from "@/pages/loginPage/Login";
import RegisterPage from "@/pages/registerPage/Register";
import AllProducts from "@/pages/productPage/AllProducts";
import ProductDetails from "@/pages/productPage/ProductDetails";
import Cart from "@/pages/cart/Cart";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import Profile from "@/pages/dashboard/user/UserProfile";
import UserOrders from "@/pages/dashboard/user/UserOrders";
import ManageProducts from "@/pages/dashboard/admin/ManageProducts";
import ManageOrders from "@/pages/dashboard/admin/ManageOrders";
import AdminDashboardLayout from "@/pages/dashboard/layout/AdminDashboardLayout";
import UserDashboardLayout from "@/pages/dashboard/layout/UserDashboardLayout";
import ManageUsers from "@/pages/dashboard/admin/ManageUsers";
import Checkout from "@/pages/checkout/Checkout";
import OrderConfirmation from "@/pages/orderPage/OrderConfirmation";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      {
        path: "cart",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Cart /> }],
      },
      { path: "checkout", element: <Checkout /> },
      { path: "order-confirmation/:id", element: <OrderConfirmation /> },
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
      {
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <>
                <UserOrders />
              </>
            ),
          },
          { path: "orders", element: <UserOrders /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },

  // Admin Dashboard (Protected)
  {
    path: "/dashboard/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: (
              <>
                <ManageProducts />
              </>
            ),
          },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "manage-orders", element: <ManageOrders /> },
          { path: "manage-users", element: <ManageUsers /> },
        ],
      },
    ],
  },
]);
