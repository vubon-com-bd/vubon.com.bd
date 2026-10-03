import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface ProductReview {
  readonly id: string;
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly createdAt: string;
}

export interface ProductReviewsResult {
  readonly reviews: readonly ProductReview[];
  readonly total: number;
  readonly averageRating: number;
}

export function useProductReviews(
  productId: string,
  params: QueryParams = {},
  fetcher: (
    productId: string,
    params: QueryParams,
    signal: AbortSignal
  ) => Promise<ProductReviewsResult>
): {
  readonly reviews: readonly ProductReview[];
  readonly total: number;
  readonly averageRating: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['products', 'reviews', productId, params];
  const result = useQuery<ProductReviewsResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(productId, params, signal),
    enabled: productId.length > 0,
  });
  return {
    reviews: result.data?.reviews ?? [],
    total: result.data?.total ?? 0,
    averageRating: result.data?.averageRating ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
