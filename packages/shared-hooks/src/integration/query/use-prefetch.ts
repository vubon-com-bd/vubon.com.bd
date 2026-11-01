import { useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/** Returns a memoized prefetch helper bound to the current query client. */
export function usePrefetch(): {
  readonly prefetch: <T>(key: QueryKey, fn: () => Promise<T>) => Promise<void>;
} {
  const client = useQueryClient();
  return {
    prefetch: async <T>(key: QueryKey, fn: () => Promise<T>) => {
      await client.prefetchQuery({ queryKey: key, queryFn: fn });
    },
  };
}
