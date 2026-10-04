import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface CustomerReview {
  readonly id: string;
  readonly productId: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly createdAt: string;
}

export interface CustomerReviewListResult {
  readonly reviews: readonly CustomerReview[];
  readonly total: number;
}

export function useReviews(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<CustomerReviewListResult>
): {
  readonly reviews: readonly CustomerReview[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['customer', 'reviews', params];
  const result = useQuery<CustomerReviewListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 60_000,
  });
  return {
    reviews: result.data?.reviews ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
