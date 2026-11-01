import { useCallback, useState } from 'react';

export interface LazyFetchState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly fetch: (signal?: AbortSignal) => Promise<T | null>;
  readonly reset: () => void;
}

/** On-demand fetch — nothing runs until `fetch()` is called. */
export function useLazyFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>): LazyFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(
    async (signal?: AbortSignal): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        const controller = new AbortController();
        const merged = signal ?? controller.signal;
        const value = await fetcher(merged);
        setData(value);
        return value;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return null;
        setError(err instanceof Error ? err : new Error('Fetch failed'));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetcher]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, fetch: run, reset };
}
