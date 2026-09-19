import { useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/** Returns memoized invalidate helpers. */
export function useInvalidate(): {
  readonly invalidate: (key: QueryKey) => Promise<void>;
  readonly invalidateAll: () => Promise<void>;
  readonly remove: (key: QueryKey) => void;
} {
  const client = useQueryClient();
  return {
    invalidate: async (key: QueryKey) => {
      await client.invalidateQueries({ queryKey: key });
    },
    invalidateAll: async () => {
      await client.invalidateQueries();
    },
    remove: (key: QueryKey) => {
      client.removeQueries({ queryKey: key });
    },
  };
}
