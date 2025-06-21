import { Switch } from 'antd';
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { isDark, handleThemeChange } = useTheme();

  return (
    <Switch
      checkedChildren="🌙"
      unCheckedChildren="🔆"
      checked={isDark}
      onChange={handleThemeChange}
      style={{ marginLeft: 'auto' }}
    />
  );
};

export default ThemeSwitcher;
