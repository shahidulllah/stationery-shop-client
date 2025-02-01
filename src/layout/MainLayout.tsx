
import { Outlet } from "react-router";
import Footer from "../pages/home/footer/Footer";
import Navbar from "../pages/home/navbar/Navbar";


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default MainLayout;
