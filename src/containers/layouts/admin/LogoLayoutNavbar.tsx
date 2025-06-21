import { Link } from '@tanstack/react-router';
import { Image as AntImage } from 'antd';
import React from 'react';
import { useTheme } from './ThemeContext';
import LogoDark from 'assets/LogoDark.png';
import LogoLight from 'assets/LogoLight.png';

const LogoLayoutNavbar: React.FC = () => {
  const { isDark } = useTheme();
  const logo = isDark ? LogoLight : LogoDark;

  return (
    <Link to='/'>
      <AntImage
        src={logo}
        preview={false}
        height={70}
        width={70}
        style={{
          marginLeft: '10px',
          marginTop: '-2px',
        }}
      />
    </Link>
  );
};

export default LogoLayoutNavbar;
