import { useAuth } from './use-auth';

export function useIsAuthenticated(): boolean {
  return useAuth().isAuthenticated;
}
