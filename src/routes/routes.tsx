import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/home/Home";
import LoginPage from "@/pages/loginPage/Login";
import RegisterPage from "@/pages/registerPage/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    }
])