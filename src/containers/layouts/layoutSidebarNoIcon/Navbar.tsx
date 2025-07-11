import { themes } from '@/styles/theme/themeConfig';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation } from '@tanstack/react-router';
import { Avatar, Col, Layout, Menu, Row, Image } from 'antd';
import 'antd/dist/reset.css'; // Ant Design reset styles
import { useUserProfile } from 'hooks/profile/useUserProfile';
import React from 'react';
import ProfileDropdown from '../admin/ProfileDropdown';
import ThemeSwitcher from '../admin/ThemeSwitcher';
import ChangeLanguage from '../ChangeLanguage';
import LanguageIconLight from 'assets/LanguageIconLight.png';
import LanguageIconDark from 'assets/LanguageIconDark.svg';
import { useTheme } from '@/containers/layouts/admin/ThemeContext';

const { Header } = Layout;
const { SubMenu } = Menu;

interface Props {
  collapsed: boolean;
  toggle: () => void;
}

export const Navbar: React.FC<Props> = (props) => {
  const { pathname } = useLocation();
  const { userInfo } = useUserProfile();
  const { isDark } = useTheme();

  return (
    <>
      <Header
        style={{
          padding: '0 0 0 0',
          paddingTop: '0.5px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
        }}
      >
        <Row justify='space-between'>
          <Col
            style={{
              zIndex: 10,
              marginRight: '-30px',
              cursor: 'pointer',
            }}
          >
            <div style={{ marginLeft: '10px' }}>
              {props.collapsed ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: '18px', color: themes.token?.colorIcon }}
                  onClick={props.toggle}
                />
              ) : (
                <MenuFoldOutlined
                  style={{ fontSize: '18px', color: themes.token?.colorIcon }}
                  onClick={props.toggle}
                />
              )}
            </div>
          </Col>
          <Col flex={'auto'}>
            <Menu
              mode='horizontal'
              selectedKeys={[pathname]}
              style={{ backgroundColor: 'primary' }}
            >
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
                      src={userInfo?.profile?.picture}
                      style={{ marginInline: '10px' }}
                    />
                    <span
                      style={{
                        fontSize: '15px',
                        marginRight: '2px',
                      }}
                    >
                      {userInfo?.profile?.nickname}
                    </span>
                  </>
                }
              >
                <ProfileDropdown />
              </SubMenu>

              {/* Change Language SubMenu */}
              <SubMenu
                title={
                  <Image
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
              <Menu.Item
                key='theme_switcher'
                style={{ padding: '0 10 0 0', marginTop: '-4px' }}
              >
                <ThemeSwitcher />
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    </>
  );
};
