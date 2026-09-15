import { useMemo, type ReactNode } from 'react';
import { UserContext } from '../contexts/user.context';
import type { AuthUser } from '../contexts/auth.context.types';

export interface UserProviderProps {
  readonly children: ReactNode;
  readonly user: AuthUser | null;
}

export function UserProvider({ children, user }: UserProviderProps): JSX.Element {
  const value = useMemo(
    () => ({
      user,
      userId: user?.id ?? null,
      displayName: user?.name ?? null,
      avatarUrl: user?.avatarUrl ?? null,
    }),
    [user],
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
