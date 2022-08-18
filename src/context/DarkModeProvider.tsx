import React, { ReactNode, useState, createContext, useContext, useCallback } from 'react';
import { ThemeType } from '../styles/theme';
import { ThemeProvider } from 'styled-components';

const THEME_KEY = 'theme';

type ThemeNameType = ContextType['themeName'];

type ContextType = {
  themeName: 'light' | 'dark';
  setThemeName: (themeName: ThemeNameType) => void;
};

function getInitialThemeName(): ThemeNameType {
  const savedTheme = localStorage.getItem(THEME_KEY) as ThemeNameType | null;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
    return savedTheme;
  } else if (prefersDark) {
    return 'dark';
  }
  return 'light';
}

const DarkModeContext = createContext<ContextType>({} as ContextType);

type Props = {
  light: ThemeType;
  dark: ThemeType;
  children: ReactNode;
};

const DarkModeProvider = ({ light, dark, children }: Props) => {
  const [themeName, setThemeName] = useState<ThemeNameType>(getInitialThemeName());
  const theme = themeName === 'light' ? light : dark;

  const setThemeNameWrapped = useCallback((themeName: ThemeNameType) => {
    setThemeName(() => {
      localStorage.setItem(THEME_KEY, themeName);
      return themeName;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ themeName, setThemeName: setThemeNameWrapped }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const { themeName, setThemeName } = useContext(DarkModeContext);
  const toggleTheme = useCallback(() => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  }, [themeName]);

  return { themeName, setThemeName, toggleTheme };
};

export default DarkModeProvider;
