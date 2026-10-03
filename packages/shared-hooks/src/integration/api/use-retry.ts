import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/** Query with custom retry + exponential backoff. */
export function useRetry<T>(
  key: QueryKey,
  fn: (signal: AbortSignal) => Promise<T>,
  options: { retries?: number; baseDelayMs?: number } = {}
): {
  readonly data: T | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const { retries = 3, baseDelayMs = 300 } = options;
  const result = useQuery<T, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fn(signal),
    retry: retries,
    retryDelay: (attempt) => Math.min(baseDelayMs * 2 ** attempt, 5000),
  });
  return {
    data: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
