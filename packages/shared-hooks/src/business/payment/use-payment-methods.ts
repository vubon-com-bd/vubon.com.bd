import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { PaymentMethod } from './payment.types';

export function usePaymentMethods(
  fetcher: (signal: AbortSignal) => Promise<readonly PaymentMethod[]>
): {
  readonly methods: readonly PaymentMethod[];
  readonly enabledMethods: readonly PaymentMethod[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['payments', 'methods'];
  const result = useQuery<readonly PaymentMethod[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  const methods = result.data ?? [];
  return {
    methods,
    enabledMethods: methods.filter((m) => m.enabled),
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
