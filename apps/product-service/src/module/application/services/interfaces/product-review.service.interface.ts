/**
 * IProductReviewService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  SubmitReviewCommandDTO,
  UpdateReviewRequestDTO,
  DeleteReviewRequestDTO,
  ApproveReviewRequestDTO,
  RejectReviewRequestDTO,
} from '../../dtos/requests/review/index.js';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
} from '../../dtos/responses/review-response.dto.js';

export const REVIEW_SERVICE = Symbol('REVIEW_SERVICE');

export interface ReviewListFilterDTO {
  readonly productId?: string;
  readonly userId?: string;
  readonly status?: string | readonly string[];
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly isVerifiedPurchase?: boolean;
}

export interface ReviewListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rating' | 'helpfulCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReviewListFilterDTO;
}

export interface IProductReviewService {
  // Commands
  submit(dto: SubmitReviewCommandDTO): Promise<ReviewResponseDTO>;
  update(dto: UpdateReviewRequestDTO): Promise<ReviewResponseDTO>;
  delete(dto: DeleteReviewRequestDTO): Promise<{ readonly success: true; readonly reviewId: string }>;
  approve(dto: ApproveReviewRequestDTO): Promise<ReviewResponseDTO>;
  reject(dto: RejectReviewRequestDTO): Promise<ReviewResponseDTO>;
  markHelpful(reviewId: string, userId: string): Promise<ReviewResponseDTO>;
  report(reviewId: string, reason: string, userId: string): Promise<ReviewResponseDTO>;

  // Queries
  getById(id: string): Promise<ReviewResponseDTO>;
  getPublic(id: string): Promise<ReviewPublicResponseDTO>;
  listByProduct(productId: string): Promise<readonly ReviewSummaryResponseDTO[]>;
  list(options: ReviewListOptionsDTO): Promise<ReviewListResponseDTO>;
  listPending(): Promise<readonly ReviewSummaryResponseDTO[]>;
  getStats(productId: string): Promise<ReviewStatsResponseDTO>;
}
