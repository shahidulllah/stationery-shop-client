import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const UserRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user?.role === "user" ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
