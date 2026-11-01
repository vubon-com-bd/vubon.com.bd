import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

/**
 * Read + patch a query's data in the cache.
 * ⚠️ Only usable after the query has been fetched at least once.
 */
export function useQueryState<T>(key: QueryKey): {
  readonly data: T | undefined;
  readonly setData: (updater: T | ((prev: T | undefined) => T | undefined)) => void;
  readonly remove: () => void;
} {
  const client = useQueryClient();
  const data = client.getQueryData<T>(key);

  const setData = useCallback(
    (updater: T | ((prev: T | undefined) => T | undefined)) => {
      client.setQueryData<T>(key, (prev) =>
        typeof updater === 'function'
          ? (updater as (p: T | undefined) => T | undefined)(prev)
          : updater
      );
    },
    [client, key]
  );

  const remove = useCallback(() => {
    client.removeQueries({ queryKey: key });
  }, [client, key]);

  return useMemo(() => ({ data, setData, remove }), [data, setData, remove]);
}
