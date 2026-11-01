/**
 * Integration query types.
 * Re-exports the underlying TanStack Query types — we do NOT re-implement.
 */
export type {
  QueryKey,
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  QueryClient,
  QueryClientConfig,
} from '@tanstack/react-query';

export interface QueryMeta {
  readonly source?: string;
  readonly tags?: readonly string[];
}
