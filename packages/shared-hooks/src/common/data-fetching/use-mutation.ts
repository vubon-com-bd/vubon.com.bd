import { useState, useCallback } from 'react';

export interface UseMutationOptions<T = unknown, V = unknown> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | undefined, error: Error | null, variables: V) => void;
  retry?: number;
  retryDelay?: number;
}

export interface UseMutationResult<T = unknown, V = unknown> {
  mutate: (variables: V) => Promise<T>;
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export function useMutation<T = unknown, V = unknown>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T, V> = {}
): UseMutationResult<T, V> {
  const { onSuccess, onError, onSettled, retry = 0, retryDelay = 1000 } = options;

  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const reset = useCallback((): void => {
    setData(undefined);
    setError(null);
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
  }, []);

  const mutate = useCallback(
    async (variables: V): Promise<T> => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);

      let attempt = 0;
      let lastError: Error | null = null;

      const execute = async (): Promise<T> => {
        try {
          const result = await mutationFn(variables);
          setData(result);
          setIsSuccess(true);
          onSuccess?.(result, variables);
          return result;
        } catch (err) {
          const errorObj = err as Error;
          lastError = errorObj;
          setError(errorObj);
          setIsError(true);
          onError?.(errorObj, variables);

          if (attempt < retry) {
            attempt++;
            await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
            return execute();
          }

          throw errorObj;
        } finally {
          setIsLoading(false);
          onSettled?.(data, lastError, variables);
        }
      };

      return execute();
    },
    [mutationFn, onSuccess, onError, onSettled, retry, retryDelay, data]
  );

  return {
    mutate,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    reset,
  };
}
