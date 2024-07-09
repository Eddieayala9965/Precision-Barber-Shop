import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const isLoggedIn = Boolean(Cookies.get("access_token"));

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
