import { useCallback, useEffect, useRef, useState } from 'react';

export interface AbortableFetchState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly run: () => Promise<T | null>;
  readonly abort: () => void;
  readonly reset: () => void;
}

/**
 * Fetch with explicit abort control.
 * Auto-aborts on unmount.
 */
export function useAbortableFetch<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  options: { auto?: boolean } = {}
): AbortableFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const ctrlRef = useRef<AbortController | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      ctrlRef.current?.abort();
    };
  }, []);

  const run = useCallback(async (): Promise<T | null> => {
    ctrlRef.current?.abort();
    const controller = new AbortController();
    ctrlRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const value = await fn(controller.signal);
      if (mounted.current && !controller.signal.aborted) {
        setData(value);
      }
      return value;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return null;
      if (mounted.current) {
        setError(err instanceof Error ? err : new Error('Fetch failed'));
      }
      return null;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [fn]);

  const abort = useCallback(() => {
    ctrlRef.current?.abort();
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (options.auto) void run();
  }, [options.auto]);

  return { data, loading, error, run, abort, reset };
}
