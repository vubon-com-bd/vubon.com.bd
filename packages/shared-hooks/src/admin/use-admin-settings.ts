import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface AdminSettings {
  readonly maintenanceMode: boolean;
  readonly signupEnabled: boolean;
  readonly commissionRate: number;
  readonly currency: string;
}

export function useAdminSettings(fetcher: (signal: AbortSignal) => Promise<AdminSettings>): {
  readonly settings: AdminSettings | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'settings'];
  const result = useQuery<AdminSettings, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 5 * 60_000,
  });
  return {
    settings: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
