import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Payment } from './payment.types';

export function usePayment(
  id: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<Payment>
): {
  readonly payment: Payment | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['payments', id];
  const result = useQuery<Payment, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(id, signal),
    enabled: id.length > 0,
  });
  return {
    payment: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
