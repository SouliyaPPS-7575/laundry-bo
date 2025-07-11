import { useNavigate } from '@tanstack/react-router';
import useNoti from 'hooks/noti/useNoti';
import { useTranslation } from 'react-i18next';
import { useZitadelAuth } from '@/hooks/auth/useZitadelAuth';

export const useLogin = () => {
  const { t } = useTranslation();
  const { addSuccessNoti } = useNoti();
  const navigate = useNavigate();
  const { authorize } = useZitadelAuth();

  const handleLogin = async () => {
    try {
      await authorize();
      addSuccessNoti(t('login_successfully'), t('welcome'));
      navigate({ to: '/' });
    } catch (error) {
      console.error('Zitadel login failed:', error);
      // Handle login error, e.g., show an error notification
    }
  };

  return {
    handleLogin,
  };
};
