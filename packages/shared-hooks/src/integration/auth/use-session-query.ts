import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { SessionInfo } from '@vubon/shared-auth/common';

export function useSessionQuery(fetcher: (signal: AbortSignal) => Promise<SessionInfo | null>): {
  readonly session: SessionInfo | null | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['auth', 'session'];
  const result = useQuery<SessionInfo | null, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 30_000,
  });
  return {
    session: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
