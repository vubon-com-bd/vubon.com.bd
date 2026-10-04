import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/** Query that polls at a fixed interval. */
export function usePolling<T>(
  key: QueryKey,
  fn: (signal: AbortSignal) => Promise<T>,
  intervalMs = 30_000,
  enabled = true
): {
  readonly data: T | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const result = useQuery<T, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fn(signal),
    refetchInterval: intervalMs,
    enabled,
  });
  return {
    data: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
