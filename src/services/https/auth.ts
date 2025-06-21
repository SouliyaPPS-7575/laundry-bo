import { IAuth, LoginData } from 'models/auth';
import { baseInstance } from './axios_client';

// Login API request
export const loginCallApi = async (auth: IAuth) => {
  const response = await baseInstance.post<LoginData>('/v1/login', auth);
  return response.data;
};

// Logout API request
export const logoutCallApi = async () => {
  await baseInstance.post<void>('/v1/logout');
};