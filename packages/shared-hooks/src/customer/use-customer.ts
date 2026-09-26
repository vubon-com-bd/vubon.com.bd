import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface CustomerContext {
  readonly customerId: string;
  readonly name: string;
  readonly email: string;
  readonly tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export function useCustomer(fetcher: (signal: AbortSignal) => Promise<CustomerContext>): {
  readonly customer: CustomerContext | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['customer', 'context'];
  const result = useQuery<CustomerContext, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    customer: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
