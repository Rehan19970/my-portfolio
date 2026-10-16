import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../api/auth';

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin" replace />;   // ✅ Ye theek hai
  }
  return children;
}