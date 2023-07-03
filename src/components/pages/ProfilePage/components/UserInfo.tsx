import { useSelector } from 'react-redux';
import styles from '../ProfilePage.module.scss';
import { RootState } from '@/app/store';
import FallbackIcon from '../../../../assets/fallback-image.svg';

function UserInfo() {
  const username = useSelector(
    (state: RootState) => state.profile.profileData?.username
  );

  return (
    <div className={styles.userInfo}>
      <h2>{username}</h2>
      <div className={styles.profileImage}>
        <FallbackIcon />
      </div>
    </div>
  );
}

export default UserInfo;
