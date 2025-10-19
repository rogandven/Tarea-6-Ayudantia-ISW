import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import cookies from 'js-cookie';

const AuthContext = createContext();
export const TOTAL_FAILURE = -1;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = cookies.get('jwt-auth');
    const storedUser = sessionStorage.getItem('usuario');
    // console.log(token);
    // console.log(storedUser);

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser));
        } else {
          cookies.remove('jwt-auth');
          sessionStorage.removeItem('usuario');
          // setUser(TOTAL_FAILURE);
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        cookies.remove('jwt-auth');
        sessionStorage.removeItem('usuario');
        // setUser(TOTAL_FAILURE);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const useAuthAlternate = (user) => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
