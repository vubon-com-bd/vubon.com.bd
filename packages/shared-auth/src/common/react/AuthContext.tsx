import { createContext, useContext } from 'react';
import { AuthUser, AuthTokens, AuthClient, RegisterDataIn } from '../client/auth.client';

export interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterDataIn) => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: AuthUser) => void;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  authClient: AuthClient;
  onLogin?: (user: AuthUser) => void;
  onLogout?: () => void;
  onError?: (error: Error) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
