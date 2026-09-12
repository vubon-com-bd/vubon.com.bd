import { useState, useCallback, useEffect } from 'react';

export interface UseFetchOptions {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

export interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<T>;
  execute: () => Promise<T>;
}

/**
 * Generic fetch hook. Pass a fetch function, not a URL,
 * to keep this hook decoupled from any HTTP client package.
 */
export const useFetch = <T>(
  fetcher: () => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchReturn<T> => {
  const { immediate = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      const e = err as Error;
      setError(e);
      onError?.(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [fetcher, onSuccess, onError]);

  useEffect(() => {
    if (immediate) void execute();
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute, execute };
};
