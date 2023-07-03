import useTheme from '@/hooks/layout/useTheme';
import { ReactNode, createContext, useContext } from 'react';

interface ContextValue {
  theme: 'light' | 'dark';
  switchTheme: () => void;
}

export const ThemeContext = createContext({} as ContextValue);

export const useThemeContext = () => useContext(ThemeContext);

interface Props {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const { theme, switchTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
