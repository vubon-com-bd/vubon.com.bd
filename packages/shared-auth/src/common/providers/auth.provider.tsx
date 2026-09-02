import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  isVerified: boolean;
  isLocked: boolean;
  permissions?: string[];
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

export interface AuthProviderProps {
  children: ReactNode;
  authService?: AuthService;
}

export interface AuthService {
  login(email: string, password: string): Promise<AuthUser>;
  logout(): Promise<void>;
  register(data: RegisterData): Promise<AuthUser>;
  refreshToken(): Promise<AuthUser>;
  getCurrentUser(): Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  authService 
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [authService]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!authService) throw new Error('Auth service not configured');
      const user = await authService.login(email, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (authService) {
        await authService.logout();
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      if (!authService) throw new Error('Auth service not configured');
      const user = await authService.register(data);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      if (!authService) throw new Error('Auth service not configured');
      const user = await authService.refreshToken();
      setUser(user);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
