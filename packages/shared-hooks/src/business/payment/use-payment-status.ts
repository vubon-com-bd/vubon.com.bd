import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { PaymentStatus } from './payment.types';

export function usePaymentStatus(
  paymentId: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<PaymentStatus>,
  options: { refetchIntervalMs?: number; enabled?: boolean } = {}
): {
  readonly status: PaymentStatus | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['payments', 'status', paymentId];
  const result = useQuery<PaymentStatus, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(paymentId, signal),
    enabled: (options.enabled ?? true) && paymentId.length > 0,
    refetchInterval: options.refetchIntervalMs ?? 5000,
  });
  return {
    status: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
