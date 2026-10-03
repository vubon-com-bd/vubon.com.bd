import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { ApiError } from '@vubon/shared-api/common';
import type { ApiQueryOptions } from './api.types';

/**
 * Generic API query hook.
 * Wraps useQuery + shared-api error normalization.
 */
export function useApi<T>(
  key: QueryKey,
  fn: (signal: AbortSignal) => Promise<T>,
  options: ApiQueryOptions = {}
): {
  readonly data: T | undefined;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const result = useQuery<T, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fn(signal),
    enabled: options.enabled ?? true,
    staleTime: options.staleTimeMs,
    retry: options.retry ?? 1,
    refetchInterval: options.refetchIntervalMs,
  });

  const error = result.error
    ? result.error instanceof ApiError
      ? result.error
      : new ApiError(result.error.message, { cause: result.error })
    : null;

  return {
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error,
    refetch: result.refetch,
  };
}
