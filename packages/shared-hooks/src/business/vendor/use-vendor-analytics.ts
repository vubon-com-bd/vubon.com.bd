import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { VendorAnalytics } from './vendor.types';

export function useVendorAnalytics(
  vendorId: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<VendorAnalytics>
): {
  readonly analytics: VendorAnalytics | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['vendors', vendorId, 'analytics'];
  const result = useQuery<VendorAnalytics, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(vendorId, signal),
    enabled: vendorId.length > 0,
    staleTime: 5 * 60_000,
  });
  return {
    analytics: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
