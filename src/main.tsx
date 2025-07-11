import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { Loading } from '@/components/Loading';
import { PageNotFound } from '@/components/PageNotFound';
import '@/styles/css/App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import { ThemeModeProvider } from './containers/layouts/admin/ThemeContext';
import { AuthProvider } from './hooks/auth/AuthContext';
import NotificationProvider from './hooks/noti/useNotificationProvider';
import { routeTree } from './routeTree.gen';
import { themes } from './styles/theme/themeConfig';

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: PageNotFound, // 404 component
  defaultPendingComponent: Loading, // Add default loading component here
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themes}>
        <ThemeModeProvider>
          <I18nextProvider i18n={i18n}>
            <NotificationProvider>
              <AuthProvider>
                <RouterProvider router={router} />
              </AuthProvider>
            </NotificationProvider>
          </I18nextProvider>
        </ThemeModeProvider>
      </ConfigProvider>
      {/* Add React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
