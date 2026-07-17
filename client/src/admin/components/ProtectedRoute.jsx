import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}
