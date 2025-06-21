import { useNavbarMenu } from '@/hooks/layouts/useNavbarMenu';
import { useUserProfile } from '@/hooks/profile/useUserProfile';
import { darkTheme, themes } from '@/styles/theme/themeConfig';
import {
  DownOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'; // Added DownOutlined for 'More' dropdown
import {
  Menu as AntdMenu,
  Image as AntImage,
  Avatar,
  Button,
  Col,
  Drawer,
  Layout,
  Row,
} from 'antd';
import 'antd/dist/reset.css'; // Ant Design reset styles
import LanguageIconDark from 'assets/LanguageIconDark.svg';
import LanguageIconLight from 'assets/LanguageIconLight.png';
import { t } from 'i18next';
import React from 'react';
import ChangeLanguage from '../ChangeLanguage';
import LogoLayoutNavbar from '../admin/LogoLayoutNavbar';
import {
  menuItems,
  renderMenuItems, // Assumes you'll modify this to accept slicing params
  renderMenuItemsWithClose, // For mobile / drawer view
} from '../admin/MenuItems';
import ProfileDropdown from '../admin/ProfileDropdown';
import { useTheme } from '../admin/ThemeContext';
import ThemeSwitcher from '../admin/ThemeSwitcher';

const { Header } = Layout;
const { SubMenu } = AntdMenu;

export const Navbar: React.FC = () => {
  const { userInfo } = useUserProfile();
  const { isDark } = useTheme();

  const {
    // State Variables
    drawerVisible,
    showDrawer,
    closeDrawer,

    // Keep track of current route
    pathname,

    // State Functions
    visibleMenuItems,
    overflowMenuItems,
  } = useNavbarMenu();

  return (
    <>
      <Header
        style={{
          padding: '0 0 0 0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row
          justify='space-between'
          align='middle'
          wrap={false}
          gutter={[16, 0]}
        >
          {/* Left Section: App Logo */}
          <Col>
            <LogoLayoutNavbar />
          </Col>

          <Col flex='auto' className='desktop-menu'>
            <AntdMenu
              mode='horizontal'
              selectedKeys={[pathname]}
              style={{
                borderRight: 'none', // Remove the right border (default Antd style)
              }}
            >
              {/* Render Visible Menu Items */}
              {renderMenuItems(visibleMenuItems)}

              {/* If there are overflow items, show them in a "More" dropdown */}
              {overflowMenuItems.length > 0 && (
                <SubMenu
                  key='more'
                  title={
                    <>
                      <span style={{ fontSize: '15px' }}>{t('more')}</span>
                      <DownOutlined style={{ marginLeft: '4px' }} />
                    </>
                  }
                >
                  {renderMenuItems(overflowMenuItems)}
                </SubMenu>
              )}

              {/* Profile SubMenu */}
              <SubMenu
                key='profile_sub_menu'
                style={{ marginLeft: 'auto', marginTop: '-2px' }}
                title={
                  <>
                    <Avatar
                      shape='circle'
                      size='large'
                      icon={<UserOutlined />}
                      src={userInfo?.avatar}
                      style={{ marginInline: '10px' }}
                    />
                    <span style={{ fontSize: '15px', marginRight: '2px' }}>
                      {userInfo?.firstname}
                    </span>
                  </>
                }
              >
                <ProfileDropdown />
              </SubMenu>

              {/* Change Language SubMenu */}
              <SubMenu
                key='change_language'
                title={
                  <AntImage
                    src={isDark ? LanguageIconDark : LanguageIconLight}
                    preview={false}
                    height={18}
                    style={{ marginBottom: '5px' }}
                  />
                }
                style={{ marginLeft: '-2px' }}
              >
                <ChangeLanguage />
              </SubMenu>

              {/* Theme Switcher */}
              <AntdMenu.Item
                key='theme_switcher'
                style={{ padding: '0 10 0 0', marginTop: '-4px' }}
              >
                <ThemeSwitcher />
              </AntdMenu.Item>
            </AntdMenu>
          </Col>

          {/* Menu Icon Button for Mobile */}
          <div className='mobile-menu-button' style={{ paddingRight: '10px' }}>
            <Button
              type='text'
              icon={
                <MenuFoldOutlined
                  style={{ fontSize: '18px', color: themes.token?.colorIcon }}
                />
              }
              onClick={showDrawer}
            />
          </div>
        </Row>
      </Header>

      {/* Mobile Drawer Component */}
      <Drawer
        title={t('menu')}
        placement='right'
        onClose={closeDrawer}
        open={drawerVisible}
        style={{
          backgroundColor: isDark
            ? darkTheme.token?.colorBgBase
            : themes.token?.colorBgBase,
        }}
      >
        <AntdMenu
          mode='inline'
          defaultSelectedKeys={[pathname]}
          style={{
            paddingBottom: 10,
            overflowY: 'auto',
            height: '100%',
            borderRight: 'none',
            backgroundColor: isDark
              ? darkTheme.token?.colorBgBase
              : themes.token?.colorBgBase,
          }}
        >
          {/* Render Menu Items inside Drawer (close after each selection) */}
          {renderMenuItemsWithClose(menuItems)}

          {/* Profile for Mobile */}
          <SubMenu
            key='profile_sub_menu_mobile'
            title={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'right',
                  justifyContent: 'right',
                }}
              >
                <Avatar
                  shape='circle'
                  size='large'
                  icon={<UserOutlined />}
                  src={userInfo?.avatar}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '15px', textAlign: 'right' }}>
                  {userInfo?.firstname}
                </span>
              </div>
            }
          >
            <ProfileDropdown />
          </SubMenu>

          {/* Change Language Menu */}
          <SubMenu
            key='change_language_submenu_mobile'
            title={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'right',
                  justifyContent: 'right',
                }}
              >
                <AntImage
                  src={isDark ? LanguageIconDark : LanguageIconLight}
                  preview={false}
                  height={18}
                  style={{ marginBottom: '30px' }}
                />
              </div>
            }
          >
            <ChangeLanguage />
          </SubMenu>

          {/* Theme Switcher for Mobile */}
          <AntdMenu.Item
            key='theme_switcher_mobile'
            style={{
              padding: '0 10 0 0',
              marginTop: '-4px',
              textAlign: 'right',
            }}
          >
            <ThemeSwitcher />
          </AntdMenu.Item>
        </AntdMenu>
      </Drawer>

      {/* Media Queries for Mobile */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-menu {
            display: none; /* Hide desktop menu on smaller screens */
          }
          .mobile-menu-button {
            display: block; /* Show icon on smaller screens */
          }
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none; /* Hide icon on desktop screens */
          }
        }
      `}</style>
    </>
  );
};
