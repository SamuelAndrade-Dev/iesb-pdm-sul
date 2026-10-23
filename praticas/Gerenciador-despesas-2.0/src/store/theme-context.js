import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    setThemeMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({
      themeMode,
      themeColors: colors[themeMode],
      toggleTheme,
    }),
    [themeMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  }
  return context;
}
