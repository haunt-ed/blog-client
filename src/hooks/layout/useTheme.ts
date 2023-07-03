import { useEffect, useState } from 'react';

export type ThemeType = 'light' | 'dark';

const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');

    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      setTheme(localTheme);
    } else {
      localStorage.setItem('theme', theme);
    }
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    switchTheme,
  };
};

export default useTheme;
