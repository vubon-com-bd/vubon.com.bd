import { useCallback, useEffect, useRef, useState } from 'react';

export interface AsyncState<T> {
  readonly data: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
}

export interface AsyncResult<T> extends AsyncState<T> {
  readonly run: () => Promise<void>;
  readonly reset: () => void;
}

/**
 * Run an async fn on mount / on dep change.
 * Auto-cancels on unmount. No setState after unmount.
 */
export function useAsync<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  deps: readonly unknown[] = []
): AsyncResult<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const mounted = useRef(true);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      abortRef.current?.abort();
    };
  }, []);

  const run = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn(controller.signal);
      if (mounted.current && !controller.signal.aborted) {
        setState({ data, loading: false, error: null });
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (mounted.current && !controller.signal.aborted) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error('Unknown error'),
        });
      }
    }
  }, deps);

  useEffect(() => {
    void run();
    return () => abortRef.current?.abort();
  }, deps);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, run, reset };
}
