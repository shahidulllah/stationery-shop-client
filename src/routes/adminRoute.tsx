import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const AdminRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
