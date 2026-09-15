import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/auth.context';
import type { AuthContextValue, AuthUser } from '../contexts/auth.context.types';

export interface AuthProviderProps {
  readonly children: ReactNode;
  readonly initialUser?: AuthUser | null;
  readonly initialRoles?: readonly string[];
  readonly initialPermissions?: readonly string[];
  readonly login: (input: { identifier: string; password: string }) => Promise<void>;
  readonly logout: () => Promise<void>;
  readonly refresh: () => Promise<void>;
}

export function AuthProvider({
  children,
  initialUser = null,
  initialRoles = [],
  initialPermissions = [],
  login,
  logout,
  refresh,
}: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const wrappedLogin = useCallback(
    async (input: { identifier: string; password: string }) => {
      setIsLoading(true);
      try {
        await login(input);
        setUser((prev) => prev ?? { id: 'self' });
      } finally {
        setIsLoading(false);
      }
    },
    [login],
  );

  const wrappedLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      roles: initialRoles,
      permissions: initialPermissions,
      login: wrappedLogin,
      logout: wrappedLogout,
      refresh,
    }),
    [user, isLoading, initialRoles, initialPermissions, wrappedLogin, wrappedLogout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
