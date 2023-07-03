import { RootState } from '@/app/store';
import { logout } from '@/features/auth/authSlice';
import { AuthService } from '@/services/AuthService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function LogoutPage() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await AuthService.logout();
    dispatch(logout());
    navigate('/sign-in');
  };

  useEffect(() => {
    if (isAuth) {
      handleLogout();
    }
  }, [isAuth]);

  return <Navigate to={'/sign-in'} />;
}

export default LogoutPage;
