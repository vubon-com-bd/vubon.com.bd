import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Facet } from './search.types';

export function useFacets(
  query: string,
  fields: readonly string[],
  fetcher: (
    query: string,
    fields: readonly string[],
    signal: AbortSignal
  ) => Promise<readonly Facet[]>
): {
  readonly facets: readonly Facet[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['search', 'facets', query, fields];
  const result = useQuery<readonly Facet[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(query, fields, signal),
    enabled: query.trim().length > 0,
    staleTime: 60_000,
  });
  return {
    facets: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
