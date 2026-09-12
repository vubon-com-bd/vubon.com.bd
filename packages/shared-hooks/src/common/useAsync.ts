import { useState, useCallback, useEffect } from 'react';

export interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: () => Promise<T>;
}

export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsyncReturn<T> => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async (): Promise<T> => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      const err = error as Error;
      setState({ data: null, loading: false, error: err });
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) void execute();
  }, [execute, immediate]);

  return { ...state, execute };
};
