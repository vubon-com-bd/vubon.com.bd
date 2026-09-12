import { useState, useCallback } from 'react';

export interface UseMutationOptions<T, V> {
  mutationFn: (variables: V) => Promise<T>;
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | null, error: Error | null, variables: V) => void;
}

export interface UseMutationReturn<T, V> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (variables: V) => Promise<T>;
  reset: () => void;
}

export const useMutation = <T, V>({
  mutationFn,
  onSuccess,
  onError,
  onSettled,
}: UseMutationOptions<T, V>): UseMutationReturn<T, V> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: V): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(variables);
        setData(result);
        onSuccess?.(result, variables);
        onSettled?.(result, null, variables);
        return result;
      } catch (err) {
        const e = err as Error;
        setError(e);
        onError?.(e, variables);
        onSettled?.(null, e, variables);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, onSuccess, onError, onSettled]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
};
