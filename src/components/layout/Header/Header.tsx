import styles from './Header.module.scss';
import Logo from '@/components/common/Logo/Logo';
import Button from '@/components/common/Button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import ThemeSwitcher from './components/ThemeSwitcher';
import AuthButton from './components/AuthButton';

function Header() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <header className={styles.mainContainer}>
      <Logo />
      <div className={styles.rightSide}>
        <ThemeSwitcher />
        {!isAuth ? (
          <Button
            type="link"
            link="/sign-up"
            text="Sign Up"
            className={styles.button}
          />
        ) : (
          <AuthButton />
        )}
      </div>
    </header>
  );
}

export default Header;
