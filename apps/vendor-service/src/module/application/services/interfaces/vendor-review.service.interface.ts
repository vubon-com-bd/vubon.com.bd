/**
 * IVendorReviewService
 * @module vendor-service/application/services/interfaces
 */
import type {
  VendorReviewResponseDto,
  VendorReviewPublicDto,
} from '../../dtos/responses/vendor-review-response.dto.js';

export const VENDOR_REVIEW_SERVICE = Symbol('VENDOR_REVIEW_SERVICE');

export interface SubmitReviewInput {
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId: string;
  readonly rating: number;
  readonly comment?: string;
  readonly isVerifiedPurchase: boolean;
}

export interface IVendorReviewService {
  submit(input: SubmitReviewInput, actorId?: string): Promise<VendorReviewResponseDto>;
  approve(reviewId: string, actorId?: string): Promise<VendorReviewResponseDto>;
  reject(reviewId: string, reason: string, actorId?: string): Promise<VendorReviewResponseDto>;
  flag(reviewId: string, reason: string, actorId?: string): Promise<VendorReviewResponseDto>;
  hide(reviewId: string, reason: string, actorId?: string): Promise<VendorReviewResponseDto>;
  restore(reviewId: string, actorId?: string): Promise<VendorReviewResponseDto>;
  getById(reviewId: string): Promise<VendorReviewResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorReviewResponseDto[]>;
  listPublicByVendor(vendorId: string): Promise<readonly VendorReviewPublicDto[]>;
}
