import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem('authUser');

  return auth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;