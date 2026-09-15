import {
  useQuery as useTanstackQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

/**
 * Thin wrapper over TanStack `useQuery`.
 * Kept as a wrapper so we can enforce our own options / error normalization
 * in one place without leaking TanStack into every call site.
 */
export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> {
  return useTanstackQuery<TQueryFnData, TError, TData, TQueryKey>(options);
}
