// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/checkTokenExpiry';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />; // <- ✅ Prevents going back
  }

  return children;
};

export default ProtectedRoute;
