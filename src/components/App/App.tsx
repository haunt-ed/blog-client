import { Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from '../layout/CommonLayout/CommonLayout';
import AuthPage from '../pages/AuthPage/AuthPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AuthService } from '@/services/AuthService';
import { finishLoading, login, startLoading } from '@/features/auth/authSlice';
import LogoutPage from '../pages/LogoutPage/LogoutPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.auth.userData?.id
  );

  const resetToken = async () => {
    dispatch(startLoading());
    try {
      const res = await AuthService.checkAuth();
      dispatch(login(res.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(finishLoading());
    }
  };

  useEffect(() => {
    resetToken();
  }, []);

  return (
    <CommonLayout>
      <Routes>
        <Route path="" element={<div></div>} />
        <Route path="sign-in" element={<AuthPage page="login" />} />
        <Route path="sign-up" element={<AuthPage page="registration" />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="profile">
          <Route path=":id" element={<ProfilePage />} />
          <Route
            path=""
            element={
              <Navigate to={currentUser ? `/profile/${currentUser}` : '/'} />
            }
          />
        </Route>
      </Routes>
    </CommonLayout>
  );
}

export default App;
