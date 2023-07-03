import { useThemeContext } from '@/context/ThemeContext';
import styles from './CommonLayout.module.scss';
import { ReactNode } from 'react';
import Header from '../Header/Header';

interface Props {
  children: ReactNode;
}

function CommonLayout({ children }: Props) {
  const { theme } = useThemeContext();

  return (
    <div className={styles.page} data-theme={theme}>
      <div className={styles.content}>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default CommonLayout;
