import { themeMode } from '@/styles/theme/themeConfig';
import { useLocation } from '@tanstack/react-router';
import { Affix, Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import LogoLayoutSidebar from '../admin/LogoLayoutSidebar';
import { menuItems, renderMenuItems } from '../admin/MenuItems';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  onCollapse: () => void;
}

export const SidebarMenuIcon: React.FC<Props> = (prop) => {
  const { pathname } = useLocation();

  return (
    <Sider
      theme={themeMode}
      width={240}
      collapsible
      collapsed={prop.collapsed}
      collapsedWidth={45}
      breakpoint='lg'
      onCollapse={prop.onCollapse}
      style={{
        height: '100vh', // Full height
        position: 'fixed', // Make the Sider fixed on the viewport
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto', // Enable vertical scrolling in the Sider when content overflows
        zIndex: 1000, // Ensure this fixed Sider is above other content
      }}
    >
      <Affix
        offsetTop={0}
        style={{
          zIndex: 10,
          marginBottom: 12,
        }}
      >
        <Row justify='center' style={{ margin: 1 }}>
          <Col>
            <LogoLayoutSidebar height={prop.collapsed ? '100%' : 100} />
          </Col>
        </Row>
      </Affix>

      <Menu
        mode='inline'
        defaultSelectedKeys={[pathname]}
        style={{
          borderRight: 0,
          paddingBottom: 50,
          overflowY: 'auto', // Allow this section to scroll
          height: 'calc(100vh - 110px)', // Adjust height to account for sticky elements (logo and divider)
        }}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};
