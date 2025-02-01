import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};
