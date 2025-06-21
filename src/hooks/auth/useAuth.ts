import { localStorageToken } from "@/services/cache";

// Mock function to check if a user is authenticated (real implementation should fetch token or auth state)
export const useAuth = () => {
  const token = !localStorageToken.getAccessToken(); // Example, replace with actual auth logic
  return !!token; // Boolean indicating whether the user is authenticated
};