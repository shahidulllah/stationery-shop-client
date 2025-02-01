import About from "@/pages/aboutPage/About";
import LoginPage from "@/pages/loginPage/Login";
import AllProducts from "@/pages/productPage/AllProducts";
import Cart from "@/pages/productPage/Cart";
import ProductDetails from "@/pages/productPage/ProductDetails";
import RegisterPage from "@/pages/registerPage/Register";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import Dashboard from "@/pages/dashboard/Dashboard";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import { AdminRoute } from "./adminRoute";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // Private Routes
  { path: "/dashboard", 
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: "/dashboard/user",
    element: <PrivateRoute><UserDashboard /></PrivateRoute>,
  },

  // Admin Routes
  {
    path: "/dashboard/admin",
    element: <AdminRoute><AdminDashboard/></AdminRoute>,
  },
]);
