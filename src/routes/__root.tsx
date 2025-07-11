import { LayoutKey, SelectLayouts } from 'containers/layouts/SelectLayouts';
import {
  createRootRoute,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router';
import { useAuth } from 'hooks/auth/useAuth';
import { useEffect } from 'react';

export const DefaultLayout: LayoutKey = 'LayoutSideBarIcon'; // Default layout

export const Route = createRootRoute({
  component: () => {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useRouterState({ select: (s) => s.location });
    const { pathname } = location;

    useEffect(() => {
      if (
        !isLoading &&
        !isAuthenticated &&
        pathname !== '/login' &&
        !pathname.startsWith('/callback')
      ) {
        navigate({ to: '/login' });
      }
    }, [isAuthenticated, isLoading, navigate, pathname]);

    if (isLoading) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <SelectLayouts />;
  },
});
