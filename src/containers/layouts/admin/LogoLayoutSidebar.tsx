import { Link } from '@tanstack/react-router';
import { Image } from 'antd';
import React from 'react';
import { useTheme } from './ThemeContext';
import LogoDark from 'assets/LogoDark.png';
import LogoLight from 'assets/LogoLight.png';

interface Props {
  height: number | string;
}
const LogoLayoutSidebar: React.FC<Props> = ({ height: prop }) => {
  const { isDark } = useTheme();
  const logo = isDark ? LogoLight : LogoDark;

  return (
    <Link to='/'>
      <Image src={logo} preview={false} height={prop} />
    </Link>
  );
};

export default LogoLayoutSidebar;
