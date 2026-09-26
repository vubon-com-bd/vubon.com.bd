import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface InventoryEntry {
  readonly productId: string;
  readonly sku: string;
  readonly available: number;
  readonly reserved: number;
  readonly lowStockThreshold: number;
}

export function useSellerInventory(
  fetcher: (signal: AbortSignal) => Promise<readonly InventoryEntry[]>
): {
  readonly entries: readonly InventoryEntry[];
  readonly lowStock: readonly InventoryEntry[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'inventory'];
  const result = useQuery<readonly InventoryEntry[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 30_000,
  });
  const entries = result.data ?? [];
  return {
    entries,
    lowStock: entries.filter((e) => e.available <= e.lowStockThreshold),
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
