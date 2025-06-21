import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { Menu } from 'antd';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const { SubMenu } = Menu;

interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
}

// Define the menu items
export const menuItems: MenuItem[] = [
  {
    key: '/dashboard',
    label: 'dashboard',
    icon: <DashboardOutlined />,
    path: '/dashboard',
  },

  {
    key: 'management',
    label: 'management',
    icon: <SettingOutlined />,
    path: '',
    children: [
      {
        key: '/users',
        label: 'users',
        path: '/users',
      },
      {
        key: '/role-permission',
        label: 'role_permission',
        path: '/role-permission',
      },
    ],
  },
];

// Render menu items from the data structure
export const renderMenuItems = (menuItems: MenuItem[]) => {
  const { t } = useTranslation();

  return menuItems.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} icon={item.icon} title={t(item.label)}>
          {renderMenuItems(item.children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.path}>{t(item.label)}</Link>
      </Menu.Item>
    );
  });
};

// Modified renderMenuItems to close the drawer on item click
export const renderMenuItemsWithClose = (menuItems: MenuItem[]) => {
  const { t } = useTranslation();

  return menuItems.map((item) => {
    if (item.children) {
      // If the menu item has sub-items (i.e., SubMenu)
      return (
        <SubMenu key={item.key} icon={item.icon} title={t(item.label)}>
          {renderMenuItemsWithClose(item.children)}
        </SubMenu>
      );
    }

    // Returning menu item with onClick handler to close the drawer
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link
          to={item.path || '/'} // Default to root if no path provided
        >
          {t(item.label)}
        </Link>
      </Menu.Item>
    );
  });
};
