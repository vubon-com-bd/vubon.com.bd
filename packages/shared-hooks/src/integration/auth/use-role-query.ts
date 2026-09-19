import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export function useRoleQuery(fetcher: (signal: AbortSignal) => Promise<readonly string[]>): {
  readonly roles: readonly string[];
  readonly loading: boolean;
  readonly hasRole: (role: string | readonly string[]) => boolean;
} {
  const key: QueryKey = ['auth', 'roles'];
  const result = useQuery<readonly string[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  const roles = result.data ?? [];
  const hasRole = (role: string | readonly string[]): boolean => {
    const list = Array.isArray(role) ? role : [role];
    return list.some((r) => roles.includes(r));
  };
  return { roles, loading: result.isLoading, hasRole };
}
