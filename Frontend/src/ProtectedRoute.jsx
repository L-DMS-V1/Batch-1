import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/forbidden" />;
};

export default ProtectedRoute;
