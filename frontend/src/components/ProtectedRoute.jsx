import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // alert(JSON.stringify(user));

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
