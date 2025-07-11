import { UserManager } from 'oidc-client-ts';
import { createContext, ReactNode, useContext } from 'react';
import { useAuth } from './useAuth';

export interface AuthContextType {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  userManager: UserManager;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};