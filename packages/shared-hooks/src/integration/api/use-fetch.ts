import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/**
 * Low-level fetch hook (raw HTTP through an injected fetcher).
 * ⚠️ Pass a shared-api-based fetcher — never call `fetch` directly.
 */
export function useFetch<T>(
  key: QueryKey,
  fetcher: (signal: AbortSignal) => Promise<T>,
  options: { enabled?: boolean } = {}
): {
  readonly data: T | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const result = useQuery<T, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    enabled: options.enabled ?? true,
  });
  return {
    data: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
