import styles from './Logo.module.scss';
import LogoIcon from '../../../assets/logo-dark.svg';
import LogoIconLight from '../../../assets/logo-light.svg';
import { Link } from 'react-router-dom';
import { useThemeContext } from '@/context/ThemeContext';

function Logo() {
  const { theme } = useThemeContext();

  return (
    <div className={styles.mainContainer}>
      <Link to="/" className={styles.link}>
        {theme === 'dark' ? <LogoIconLight /> : <LogoIcon />}
      </Link>
    </div>
  );
}

export default Logo;
