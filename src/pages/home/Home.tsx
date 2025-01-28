import { Outlet } from "react-router";


const Home = () => {
    return (
        <div className="h-screen">
            <Outlet/>
        </div>
    );
};

export default Home;