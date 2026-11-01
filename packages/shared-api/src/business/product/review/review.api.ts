import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../../common/request/request.types';
import { REVIEW_ENDPOINTS } from './review.endpoints';
import type { CreateReviewRequest, ProductReview, ReviewListResponse } from './review.types';

export const reviewApi = {
  list: async (
    productId: string,
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<ReviewListResponse> => {
    const res = await httpClient.get<ReviewListResponse>(REVIEW_ENDPOINTS.list(productId), {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  create: async (
    productId: string,
    input: Omit<CreateReviewRequest, 'productId'>,
    signal?: AbortSignal
  ): Promise<ProductReview> => {
    const res = await httpClient.post<ProductReview>(REVIEW_ENDPOINTS.create(productId), input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  remove: async (productId: string, id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(REVIEW_ENDPOINTS.delete(productId, id), {
      signal,
      timeout: 10_000,
    });
  },
} as const;
