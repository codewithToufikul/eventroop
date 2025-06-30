import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import Loading from "../../components/Loading";


const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return <Loading/>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
