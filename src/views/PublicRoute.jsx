import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/authSlice';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? <Navigate to="/contacts" replace /> : children;
}
