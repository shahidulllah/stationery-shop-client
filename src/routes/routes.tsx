import About from "@/pages/aboutPage/About";
import LoginPage from "@/pages/loginPage/Login";
import AllProducts from "@/pages/productPage/AllProducts";
import Cart from "@/pages/productPage/Cart";
import ProductDetails from "@/pages/productPage/ProductDetails";
import RegisterPage from "@/pages/registerPage/Register";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";
import PrivateRoute from "./privateRoute";
import Dashboard from "@/pages/dashboard/Dashboard";

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

  //Private route
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);
