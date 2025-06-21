import { handleTokenError } from 'services/cache';
import { baseInstance, refreshURL } from './axios_client';

// Define the refreshToken function
export const renewToken = async ({ refreshToken }: { refreshToken: string; }) => {
  try {
    const res = await baseInstance.post(refreshURL, {
      refreshToken,
    });

    return res.data;
  } catch (error) {
    handleTokenError();
    return Promise.reject(error);
  }
};




