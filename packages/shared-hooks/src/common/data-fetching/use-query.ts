import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseQueryOptions<T = unknown> {
  enabled?: boolean;
  retry?: number;
  retryDelay?: number;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: (data: T | undefined, error: Error | null) => void;
}

export interface UseQueryResult<T = unknown> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  remove: () => void;
}

// Simple cache implementation
const queryCache = new Map<string, { data: unknown; timestamp: number }>();

export function useQuery<T = unknown>(
  key: string | string[],
  fetcher: () => Promise<T>,
  options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
  const {
    enabled = true,
    retry = 3,
    retryDelay = 1000,
    staleTime = 0,
    refetchOnWindowFocus = false,
    refetchOnMount = true,
    refetchOnReconnect = false,
    onSuccess,
    onError,
    onSettled,
  } = options;

  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const retryCountRef = useRef<number>(0);
  const cacheKey = Array.isArray(key) ? key.join('-') : key;

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setIsFetching(true);
      setIsError(false);
      setError(null);

      const result = await fetcher();

      // Cache the result
      queryCache.set(cacheKey, { data: result, timestamp: Date.now() });

      setData(result);
      setIsSuccess(true);
      onSuccess?.(result);
    } catch (err) {
      const errorObj = err as Error;
      setError(errorObj);
      setIsError(true);
      onError?.(errorObj);

      // Retry logic
      if (retryCountRef.current < retry) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData();
        }, retryDelay * retryCountRef.current);
      }
    } finally {
      setIsLoading(false);
      setIsFetching(false);
      onSettled?.(data, error);
    }
  }, [cacheKey, fetcher, retry, retryDelay, onSuccess, onError, onSettled, data, error]);

  // Initial fetch
  useEffect(() => {
    if (!enabled) return;

    // Check cache
    const cached = queryCache.get(cacheKey);
    if (cached) {
      const isStale = Date.now() - cached.timestamp > staleTime;
      if (!isStale) {
        setData(cached.data as T);
        setIsSuccess(true);
        return;
      }
    }

    if (refetchOnMount) {
      setIsLoading(true);
      fetchData();
    }
  }, [enabled, cacheKey, fetchData, refetchOnMount, staleTime]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (enabled) {
        fetchData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [enabled, fetchData, refetchOnWindowFocus]);

  // Refetch on reconnect
  useEffect(() => {
    if (!refetchOnReconnect) return;

    const handleReconnect = () => {
      if (enabled) {
        fetchData();
      }
    };

    window.addEventListener('online', handleReconnect);
    return () => window.removeEventListener('online', handleReconnect);
  }, [enabled, fetchData, refetchOnReconnect]);

  const refetch = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    await fetchData();
  }, [fetchData]);

  const remove = useCallback((): void => {
    queryCache.delete(cacheKey);
    setData(undefined);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  }, [cacheKey]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
    refetch,
    remove,
  };
}
