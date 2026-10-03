import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { AuthMe, AuthQueryOptions } from './auth.types';

export const AUTH_QUERY_KEY: QueryKey = ['auth', 'me'];

/**
 * Fetches the current authenticated user.
 * Data-only hook — for context/state use `@vubon/shared-auth/react`.
 */
export function useAuthQuery(
  fetcher: (signal: AbortSignal) => Promise<AuthMe | null>,
  options: AuthQueryOptions = {}
): {
  readonly me: AuthMe | null | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const result = useQuery<AuthMe | null, Error>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: ({ signal }) => fetcher(signal),
    enabled: options.enabled ?? true,
    staleTime: options.staleTimeMs ?? 60_000,
  });
  return {
    me: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
