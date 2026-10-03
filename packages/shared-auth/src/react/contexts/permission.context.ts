import { createContext } from 'react';

export interface PermissionContextValue {
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  hasRole: (role: string | readonly string[]) => boolean;
  hasPermission: (permission: string | readonly string[], mode?: 'any' | 'all') => boolean;
}

export const PermissionContext = createContext<PermissionContextValue | null>(null);
