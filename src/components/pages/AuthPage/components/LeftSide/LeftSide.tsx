import styles from './LeftSide.module.scss';
import FacebookLogo from '../../../../../assets/facebook.svg';
import GoogleLogo from '../../../../../assets/google.svg';
import { Link } from 'react-router-dom';

interface Props {
  login: boolean;
}

function LeftSide({ login }: Props) {
  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>Login with socials</h2>
        <div className={styles.socials}>
          <div className={styles.icon}>
            <FacebookLogo />
          </div>
          <div className={styles.icon}>
            <GoogleLogo />
          </div>
        </div>
      </div>
      {!login && (
        <Link to={'/sign-in'} className={styles.link}>
          I already have an account
        </Link>
      )}
    </div>
  );
}

export default LeftSide;
