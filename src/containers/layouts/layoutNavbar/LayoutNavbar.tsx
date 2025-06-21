import { useAuth } from '@/hooks/auth/useAuth';
import { Outlet, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from 'antd';
import 'styles/css/Layout.css';
import { Navbar } from './Navbar';

const { Content } = Layout;

export const LayoutNavbar = () => {
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
          {/* Make sure the content can scroll independently of sidebar */}
          <Layout className='site-layout'>
            <Navbar />
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
