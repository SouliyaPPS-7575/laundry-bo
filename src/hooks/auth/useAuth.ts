import { useZitadelAuth } from '@/hooks/auth/useZitadelAuth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { userManager, authorize, signout } = useZitadelAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userManager.getUser().then((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
  }, [userManager]);

  const login = () => {
    authorize();
  };

  const logout = () => {
    signout();
  };

  return { isAuthenticated, isLoading, login, logout, userManager };
};
