/**
 * IReviewService Interface
 */
import type { SubmitReviewRequestDTO } from '../../dtos/requests/review/submit-review.dto.js';
import type { UpdateReviewRequestDTO } from '../../dtos/requests/review/update-review.dto.js';
import type { ReviewResponseDTO, ReviewStatsResponseDTO } from '../../dtos/responses/review-response.dto.js';

export const REVIEW_SERVICE = Symbol('REVIEW_SERVICE');

export interface IReviewService {
  submit(dto: SubmitReviewRequestDTO): Promise<ReviewResponseDTO>;
  update(dto: UpdateReviewRequestDTO): Promise<ReviewResponseDTO>;
  approve(reviewId: string, moderatorId: string): Promise<ReviewResponseDTO>;
  reject(reviewId: string, moderatorId: string, reason: string): Promise<ReviewResponseDTO>;
  remove(reviewId: string, actorId: string): Promise<void>;
  markHelpful(reviewId: string, userId: string): Promise<ReviewResponseDTO>;
  report(reviewId: string, userId: string, reason: string): Promise<ReviewResponseDTO>;
  listByProduct(productId: string, page: number, limit: number): Promise<{ items: readonly ReviewResponseDTO[]; total: number }>;
  statsByProduct(productId: string): Promise<ReviewStatsResponseDTO | null>;
}
