import { Navigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { TOTAL_FAILURE } from '@context/AuthContext';
import Loading from '@pages/Loading.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // alert(JSON.stringify(user));

  if (user === TOTAL_FAILURE) {
    return <Navigate to="/auth" replace />;
  }

  if (user !== null) {
    return children;
  } else {
    return Loading();
  }
};

export default ProtectedRoute;
