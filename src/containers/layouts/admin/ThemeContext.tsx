/* eslint-disable react-refresh/only-export-components */

import { ConfigProvider } from 'antd'; // Ant Design's ConfigProvider for theme switch
import React, { createContext, useContext, useEffect, useState } from 'react';
import { localStorageData } from 'services/cache';
import { darkTheme, themes as lightTheme } from '@/styles/theme/themeConfig'; // Import light and dark themes

// Define the shape of the context value
interface ThemeContextType {
  isDark: boolean;
  handleThemeChange: (checked: boolean) => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  handleThemeChange: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorageData.getTheme();
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Save the theme mode in localStorage when the theme is changed
    localStorageData.setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked); // Switch between dark and light modes
  };

  return (
    <ThemeContext.Provider value={{ isDark, handleThemeChange }}>
      {/* Pass the appropriate theme configuration to Ant Design's ConfigProvider */}
      <ConfigProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
