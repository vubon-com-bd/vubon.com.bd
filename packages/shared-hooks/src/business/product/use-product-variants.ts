import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export interface ProductVariant {
  readonly id: string;
  readonly productId: string;
  readonly sku: string;
  readonly name: string;
  readonly attributes: Record<string, string>;
  readonly priceDelta: number;
  readonly inStock: boolean;
}

export function useProductVariants(
  productId: string,
  fetcher: (productId: string, signal: AbortSignal) => Promise<readonly ProductVariant[]>
): {
  readonly variants: readonly ProductVariant[];
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['products', 'variants', productId];
  const result = useQuery<readonly ProductVariant[], Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(productId, signal),
    enabled: productId.length > 0,
    staleTime: 60_000,
  });
  return {
    variants: result.data ?? [],
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
