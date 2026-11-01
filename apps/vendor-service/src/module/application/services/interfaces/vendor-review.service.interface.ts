/**
 * IVendorReviewService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  SubmitReviewRequestDTO,
  RespondReviewRequestDTO,
} from '../../dtos/requests/review/index.js';
import type {
  ReviewResponseDTO,
  ReviewPublicResponseDTO,
  ReviewSummaryResponseDTO,
  ReviewListResponseDTO,
  ReviewStatsResponseDTO,
} from '../../dtos/responses/review-response.dto.js';

export const VENDOR_REVIEW_SERVICE = Symbol('VENDOR_REVIEW_SERVICE');

export interface ReviewListFilterDTO {
  readonly vendorId?: string;
  readonly userId?: string;
  readonly status?: string | readonly string[];
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly isVerifiedPurchase?: boolean;
  readonly hasReply?: boolean;
  readonly submittedFrom?: string;
  readonly submittedTo?: string;
}

export interface ReviewListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'submittedAt' | 'rating' | 'helpfulCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReviewListFilterDTO;
}

export interface IVendorReviewService {
  // Commands
  submit(dto: SubmitReviewRequestDTO, actorId?: string): Promise<ReviewResponseDTO>;
  approve(reviewId: string, actorId: string): Promise<ReviewResponseDTO>;
  reject(reviewId: string, actorId: string): Promise<ReviewResponseDTO>;
  flag(reviewId: string, reason: string, actorId: string): Promise<ReviewResponseDTO>;
  hide(reviewId: string, reason: string, actorId: string): Promise<ReviewResponseDTO>;
  reply(dto: RespondReviewRequestDTO, actorId: string): Promise<ReviewResponseDTO>;
  markHelpful(reviewId: string, userId: string): Promise<ReviewResponseDTO>;

  // Queries
  getById(id: string): Promise<ReviewResponseDTO>;
  getPublic(id: string): Promise<ReviewPublicResponseDTO>;
  listByVendor(vendorId: string, options?: ReviewListOptionsDTO): Promise<ReviewListResponseDTO>;
  listPendingModeration(limit?: number): Promise<readonly ReviewSummaryResponseDTO[]>;
  listFlagged(limit?: number): Promise<readonly ReviewSummaryResponseDTO[]>;
  getStats(vendorId?: string): Promise<ReviewStatsResponseDTO>;
}
