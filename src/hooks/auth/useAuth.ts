import { useZitadelAuth } from '@/hooks/auth/useZitadelAuth';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const { userManager } = useZitadelAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await userManager.getUser();
      return user;
    },
  });

  return { isAuthenticated: !!user, isLoading };
};
