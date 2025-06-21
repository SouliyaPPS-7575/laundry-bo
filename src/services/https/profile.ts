import { baseInstance } from "./axios_client";
import * as types from 'models/profile';

// User Profile request
export const getUserProfile = async () => {
  const response = await baseInstance.get<types.UserProfile>('/v1/users/profile');
  return response.data;
};
