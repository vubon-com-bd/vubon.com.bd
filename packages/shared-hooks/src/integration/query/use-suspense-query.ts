import {
  useSuspenseQuery as useTanstackSuspenseQuery,
  type QueryKey,
  type UseSuspenseQueryOptions,
  type UseSuspenseQueryResult,
} from '@tanstack/react-query';

export function useSuspenseQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseSuspenseQueryResult<TData, TError> {
  return useTanstackSuspenseQuery<TQueryFnData, TError, TData, TQueryKey>(options);
}
