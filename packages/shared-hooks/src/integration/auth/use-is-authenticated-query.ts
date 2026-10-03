import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export function useIsAuthenticatedQuery(fetcher: (signal: AbortSignal) => Promise<boolean>): {
  readonly isAuthenticated: boolean;
  readonly loading: boolean;
} {
  const key: QueryKey = ['auth', 'is-authenticated'];
  const result = useQuery<boolean, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });
  return {
    isAuthenticated: result.data ?? false,
    loading: result.isLoading,
  };
}
