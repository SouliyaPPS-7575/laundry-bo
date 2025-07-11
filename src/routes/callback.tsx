import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useZitadelAuth } from '@/hooks/auth/useZitadelAuth';
import { useEffect } from 'react';

export const Route = createFileRoute('/callback')({
  component: () => <Callback />,
});

const Callback: React.FC = () => {
  const { userManager } = useZitadelAuth();
  const navigate = useNavigate();

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        navigate({ to: '/' });
      })
      .catch((error) => {
        console.error('Zitadel callback error:', error);
        navigate({ to: '/login' });
      });
  }, [userManager, navigate]);

  return <div>Loading...</div>;
};

export default Callback;
