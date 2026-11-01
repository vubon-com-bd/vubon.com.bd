import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { UserAddress } from './user.types';

export function useAddresses(fetcher: (signal: AbortSignal) => Promise<readonly UserAddress[]>): {
  readonly addresses: readonly UserAddress[];
  readonly defaultAddress: UserAddress | null;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['user', 'addresses'];
  const result = useQuery<readonly UserAddress[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });
  const addresses = result.data ?? [];
  return {
    addresses,
    defaultAddress: addresses.find((a) => a.isDefault) ?? null,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
