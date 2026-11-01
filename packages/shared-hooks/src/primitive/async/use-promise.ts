import { useEffect, useRef, useState } from 'react';

export interface PromiseState<T> {
  readonly value: T | null;
  readonly loading: boolean;
  readonly error: Error | null;
}

/** Track a Promise's state. Cancels setState on unmount. */
export function usePromise<T>(promise: Promise<T> | null): PromiseState<T> {
  const [state, setState] = useState<PromiseState<T>>({
    value: null,
    loading: promise !== null,
    error: null,
  });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!promise) return;
    let cancelled = false;
    setState({ value: null, loading: true, error: null });
    promise
      .then((value) => {
        if (!cancelled && mounted.current) {
          setState({ value, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled && mounted.current) {
          setState({
            value: null,
            loading: false,
            error: err instanceof Error ? err : new Error('Unknown error'),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [promise]);

  return state;
}
