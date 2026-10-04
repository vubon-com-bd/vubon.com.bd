import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export function usePermissionQuery(fetcher: (signal: AbortSignal) => Promise<readonly string[]>): {
  readonly permissions: readonly string[];
  readonly loading: boolean;
} {
  const key: QueryKey = ['auth', 'permissions'];
  const result = useQuery<readonly string[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    permissions: result.data ?? [],
    loading: result.isLoading,
  };
}
