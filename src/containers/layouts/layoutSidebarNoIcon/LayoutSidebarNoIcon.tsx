import { useAuth } from '@/hooks/auth/useAuth';
import { Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from 'antd';
import { useLayout } from 'hooks/layouts/useLayout';
import 'styles/css/Layout.css';
import { Navbar } from './Navbar';
import { SidebarMenuNoIcon } from './SidebarMenuNoIcon';

const { Content } = Layout;

export const LayoutSideBarNoIcon = () => {
  const { collapsed, toggle } = useLayout();
  const location = useLocation();
  const { pathname } = location;

  // Check if the user is authenticated
  const isAuthenticated = useAuth();

  // Condition to determine if we should show the layout
  const shouldShowLayout = isAuthenticated && pathname !== '/login';

  return (
    <>
      {shouldShowLayout ? (
        <Layout hasSider>
          {/* Sidebar Show Icon after close persists on the side of the screen */}
          <SidebarMenuNoIcon collapsed={collapsed} onCollapse={toggle} />

          {/* Make sure the content can scroll independently of sidebar */}
          <Layout
            className='site-layout'
            style={{ marginLeft: collapsed ? 0 : 240 }}
          >
            <Navbar collapsed={collapsed} toggle={toggle} />
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'auto', // Ensure the content scrolls independently
                minHeight: '100vh', // Ensures the content occupies full height
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Outlet />
      )}

      {/* Add TanStack Router Devtools */}
      {process.env.NODE_ENV === 'development' && (
        <TanStackRouterDevtools position='bottom-left' initialIsOpen={false} />
      )}
    </>
  );
};
