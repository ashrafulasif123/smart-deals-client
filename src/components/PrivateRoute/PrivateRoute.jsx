import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading loading-spinner loading-xl"></span>
    );
  }
  if (user) {
    return children;
  }
  return (
    <Navigate to="/register" state={{ from: location }} replace></Navigate>
  );
};

export default PrivateRoute;
