import { useCallback } from 'react';
import { useAuth } from './use-auth';

export function useLogout(): {
  readonly logout: () => Promise<void>;
  readonly isLoading: boolean;
} {
  const { logout, isLoading } = useAuth();
  return { logout: useCallback(logout, [logout]), isLoading };
}
