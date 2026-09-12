import { useState, useEffect, useCallback, useRef } from 'react';
import type { Filter } from '@vubon/shared-types';
import type { Sort } from '@vubon/shared-types';
import type { SearchQuery } from '@vubon/shared-types';

export interface UseQueryOptions {
  filters?: Filter[];
  sorts?: Sort[];
  search?: string;
  enabled?: boolean;
  refetchInterval?: number;
  staleTime?: number;
}

export interface UseQueryReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<T | null>;
}

export const useQuery = <T>(
  queryFn: (query: SearchQuery) => Promise<T>,
  options: UseQueryOptions = {}
): UseQueryReturn<T> => {
  const {
    filters = [],
    sorts = [],
    search = '',
    enabled = true,
    refetchInterval,
    staleTime = 0,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);
  const lastFetchRef = useRef(0);

  const fetchData = useCallback(
    async (force = false): Promise<T | null> => {
      if (!enabled) return null;
      const now = Date.now();
      if (!force && staleTime && now - lastFetchRef.current < staleTime) {
        return data;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await queryFn({ filters, sort: sorts, query: search });
        setData(result);
        lastFetchRef.current = now;
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [queryFn, filters, sorts, search, enabled, staleTime, data]
  );

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!refetchInterval) return;
    const id = setInterval(() => void fetchData(true), refetchInterval);
    return () => clearInterval(id);
  }, [refetchInterval, fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
};
