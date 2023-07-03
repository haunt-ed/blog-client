import styles from '../Header.module.scss';
import ProfileIconLight from '../../../../assets/account-light.svg';
import ProfileIconDark from '../../../../assets/account-dark.svg';
import { useThemeContext } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { authLinks } from '@/helpers/layout/authLinks';

function AuthButton() {
  const { theme } = useThemeContext();

  return (
    <div className={styles.authButton}>
      {theme === 'dark' ? <ProfileIconLight /> : <ProfileIconDark />}
      <div className={styles.authWrapper}>
        <ul className={styles.menuList}>
          {authLinks.map(({ to, title }) => (
            <li key={to}>
              <Link to={to}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AuthButton;
