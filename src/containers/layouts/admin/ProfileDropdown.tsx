import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Menu } from 'antd';
import { useLogout } from 'hooks/auth/useLogout';
import { useTranslation } from 'react-i18next';

export default function ProfileDropdown() {
  const { t } = useTranslation();

  const { handleLogout } = useLogout();

  return (
    <Menu mode="vertical">
      <Menu.Item key={'profile'} icon={<UserOutlined />}>
        <Link to="/profile">
          {t('user_profile')}
        </Link>
      </Menu.Item>
      <Menu.Item
        key={'logout'}
        danger
        onClick={handleLogout}
        icon={<LogoutOutlined />}
      >
        {t('logout')}
      </Menu.Item>
    </Menu>
  );
}
