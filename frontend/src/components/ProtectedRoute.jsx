import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wraps a route: requires login, and optionally restricts to specific roles.
// Usage: <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
export default function ProtectedRoute({ children, roles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
