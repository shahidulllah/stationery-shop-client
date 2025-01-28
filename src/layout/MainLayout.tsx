import Footer from "../pages/home/footer/Footer";
import Home from "../pages/home/Home";
import Navbar from "../pages/home/navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
    );
};

export default MainLayout;