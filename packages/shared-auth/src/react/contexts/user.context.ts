import { createContext } from 'react';
import type { AuthUser } from './auth.context.types';

export interface UserContextValue {
  readonly user: AuthUser | null;
  readonly userId: string | null;
  readonly displayName: string | null;
  readonly avatarUrl: string | null;
}

export const UserContext = createContext<UserContextValue | null>(null);
