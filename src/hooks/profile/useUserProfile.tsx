import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from 'services/https/profile';
import { userProfileKey } from '.';

export const useUserProfile = () => {
  // Fetch user profile data using useQuery
  const {
    data: userInfo,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: userProfileKey.lists(),
    queryFn: getUserProfile,
  });

  return {
    // User Info
    userInfo,
    isLoading,
    isError,
    isSuccess,
  };
};
