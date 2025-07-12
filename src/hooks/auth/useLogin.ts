import { useAuth } from './useAuth';

export const useLogin = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Zitadel login failed:', error);
    }
  };

  return {
    handleLogin,
  };
};
