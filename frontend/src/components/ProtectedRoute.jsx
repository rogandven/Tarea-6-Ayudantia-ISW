/* import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import Loading from '../pages/Loading';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) {
    return <Loading destination={window.location.href}></Loading>
  } else if (user === null) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
*/

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));

    const isAuthenticated = !!storedUser;

    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;