import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Vendor } from './vendor.types';

export function useVendor(
  id: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<Vendor>
): {
  readonly vendor: Vendor | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['vendors', 'detail', id];
  const result = useQuery<Vendor, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(id, signal),
    enabled: id.length > 0,
    staleTime: 60_000,
  });
  return {
    vendor: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
