import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/ingresar" state={{ from: location }} replace />;
  }

  return children;
}
