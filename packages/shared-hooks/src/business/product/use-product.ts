import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export function useProduct<TProduct>(
  id: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<TProduct>
): {
  readonly product: TProduct | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['products', 'detail', id];
  const result = useQuery<TProduct, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(id, signal),
    enabled: id.length > 0,
    staleTime: 60_000,
  });
  return {
    product: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
