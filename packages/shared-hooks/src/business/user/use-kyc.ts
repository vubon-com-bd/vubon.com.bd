import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { KycStatus } from './user.types';

export function useKyc(fetcher: (signal: AbortSignal) => Promise<KycStatus>): {
  readonly status: KycStatus | undefined;
  readonly isVerified: boolean;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', 'kyc'];
  const result = useQuery<KycStatus, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    status: result.data,
    isVerified: result.data === 'approved',
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
