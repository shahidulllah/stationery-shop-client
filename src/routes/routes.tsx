import App from "@/App";
import About from "@/pages/aboutPage/About";
import LoginPage from "@/pages/loginPage/Login";
import AllProducts from "@/pages/productPage/AllProducts";
import Cart from "@/pages/productPage/Cart";
import ProductDetails from "@/pages/productPage/ProductDetails";
import RegisterPage from "@/pages/registerPage/Register";
import { Route, BrowserRouter as Router } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
        {/* Public Routes */}
      <Route path="/" element={<App />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      {/* Private Routes */}
    </Router>
  );
};

export default AppRoutes;
