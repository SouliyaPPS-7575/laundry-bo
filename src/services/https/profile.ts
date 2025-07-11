import { zitadelAuthInstance } from '@/hooks/auth/useZitadelAuth';

// User Profile request
export const getUserProfile = async () => {
  const response = await zitadelAuthInstance.userManager.getUser();
  return response;
};
