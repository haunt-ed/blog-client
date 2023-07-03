import { useThemeContext } from '@/context/ThemeContext';
import SunIcon from '../../../../assets/sun.svg';
import MoonIcon from '../../../../assets/moon.svg';

function ThemeSwitcher() {
  const { switchTheme, theme } = useThemeContext();

  return (
    <button onClick={switchTheme}>
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}

export default ThemeSwitcher
