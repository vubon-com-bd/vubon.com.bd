import type { AuthUser } from '../contexts/auth.context.types';
import { useAuth } from './use-auth';

export function useUser(): AuthUser | null {
  return useAuth().user;
}
