import { usePermission } from './use-permission';

export function useRole(role: string | readonly string[]): boolean {
  return usePermission().hasRole(role);
}
