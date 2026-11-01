import { useCallback } from 'react';
import { useAuth } from './use-auth';

export function useLogin(): {
  readonly login: (input: { identifier: string; password: string }) => Promise<void>;
  readonly isLoading: boolean;
} {
  const { login, isLoading } = useAuth();
  return { login: useCallback(login, [login]), isLoading };
}
