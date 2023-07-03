import { Navigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import LeftSide from './components/LeftSide/LeftSide';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Props {
  page: 'login' | 'registration';
}

function AuthPage({ page }: Props) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return !isAuth ? (
    <div className={styles.mainContainer}>
      <LeftSide login={page === 'login'} />
      {page === 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  ) : <Navigate to={'/profile'} />;
}

export default AuthPage;
